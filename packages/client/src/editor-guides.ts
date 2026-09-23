import * as THREE from 'three';
import { BUILDING_SIZE, BUILD_TILE_SIZE, buildingTiles, snapBuildingCoordinate, INTERACTION, MAX_HUMANS, WORLD } from '@vampire/shared';
import { createBuildingModel } from './models.js';
import type { GameScene } from './scene.js';
import { DEFAULT_MAP_BOUNDARY, playableBoundarySegments } from '@vampire/shared';

type Point = { x: number; z: number };

/** Editor-only references. Never included in the map overlay or raycast targets. */
export class EditorGuides {
  private readonly group = new THREE.Group();
  private readonly lines = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({color:0xffcf67,depthTest:false,transparent:true,opacity:0.85}));
  private readonly ruler = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({color:0x72eeff,depthTest:false}));
  private readonly crypt = createBuildingModel('crypt',MAX_HUMANS,true);
  private readonly label: THREE.Sprite;
  private readonly spawnLabel: THREE.Sprite;
  private start: Point | null = null;
  private readonly playableLine = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({color:0xff8038,depthTest:false}));
  private playableSegments: Array<[Point,Point]> | null = null;
  private end: Point | null = null;
  private rulerKey = '';

  constructor(private readonly world: GameScene) {
    this.group.name = 'editor-guides';
    this.crypt.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      const ghost = (material:THREE.Material) => {
        const copy=material.clone(); copy.transparent=true; copy.opacity=0.42; copy.depthWrite=false;
        return copy;
      };
      object.material=Array.isArray(object.material) ? object.material.map(ghost) : ghost(object.material);
      object.castShadow=false;
    });
    this.label=this.makeLabel(`CRIPTA · ${buildingTiles('crypt')} × ${buildingTiles('crypt')} tiles`);
    this.spawnLabel=this.makeLabel('NASCIMENTO DO VAMPIRO');
    this.lines.renderOrder=10; this.ruler.renderOrder=11;
    this.playableLine.renderOrder=10;
    this.group.add(this.lines,this.playableLine,this.crypt,this.label,this.spawnLabel);
    world.scene.add(this.group,this.ruler);
    this.refresh();
  }

  private makeLabel(text:string):THREE.Sprite {
    const canvas=document.createElement('canvas'); canvas.width=640; canvas.height=64;
    const ctx=canvas.getContext('2d')!;
    ctx.fillStyle='#0b1424e8'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#ffdf9e'; ctx.font='bold 27px system-ui'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(text,canvas.width/2,canvas.height/2);
    const texture=new THREE.CanvasTexture(canvas);
    const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,depthTest:false,depthWrite:false,sizeAttenuation:false}));
    sprite.scale.set(0.23,0.023,1); sprite.renderOrder=12;
    return sprite;
  }

  setVisible(visible:boolean):void { this.group.visible=visible; }

  refresh():void {
    const points:number[]=[];
    const segment=(a:Point,b:Point) => {
      const steps=Math.max(1,Math.ceil(Math.hypot(a.x-b.x,a.z-b.z)/WORLD.tileSize));
      for(let i=0;i<steps;i++) for(const t of [i/steps,(i+1)/steps]) {
        const x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t;
        points.push(x,this.world.heightAt(x,z)+0.22,z);
      }
    };
    const rect=(x:number,z:number,half:number) => {
      const corners=[{x:x-half,z:z-half},{x:x+half,z:z-half},{x:x+half,z:z+half},{x:x-half,z:z+half}];
      corners.forEach((p,i)=>segment(p,corners[(i+1)%4]!));
    };
    const boundary = this.world.map.boundary ?? DEFAULT_MAP_BOUNDARY;
    boundary.forEach((point,i) => segment(point,boundary[(i+1)%boundary.length]!));
    const p=this.world.model.cryptPosition;
    rect(p.x,p.z,BUILDING_SIZE.crypt/2);
    this.crypt.position.set(p.x,this.world.heightAt(p.x,p.z),p.z);
    this.label.position.set(p.x,this.world.heightAt(p.x,p.z)+11,p.z);
    const spawn={x:p.x+this.world.model.vampireSpawnOffset.x,z:p.z+this.world.model.vampireSpawnOffset.z};
    const radius=INTERACTION.vampireUnitRadius;
    for(let i=0;i<32;i++) segment(
      {x:spawn.x+Math.cos(i*Math.PI/16)*radius,z:spawn.z+Math.sin(i*Math.PI/16)*radius},
      {x:spawn.x+Math.cos((i+1)*Math.PI/16)*radius,z:spawn.z+Math.sin((i+1)*Math.PI/16)*radius});
    this.spawnLabel.position.set(spawn.x,this.world.heightAt(spawn.x,spawn.z)+4,spawn.z);
    this.replaceLines(this.lines,points);
    points.length=0;
    this.playableSegments ??= playableBoundarySegments(this.world.map);
    for(const [a,b] of this.playableSegments) segment(a,b);
    this.replaceLines(this.playableLine,points);
    this.rulerKey='';
    this.refreshRuler();
  }

  private replaceLines(line:THREE.LineSegments,points:number[]):void {
    line.geometry.dispose();
    line.geometry=new THREE.BufferGeometry();
    line.geometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
    line.geometry.computeBoundingSphere();
  }

  measure(point:Point):boolean {
    const snapped={x:snapBuildingCoordinate(point.x,'wall'),z:snapBuildingCoordinate(point.z,'wall')};
    if (!this.start || this.end) { this.start=snapped; this.end=null; }
    else this.end=snapped;
    this.refreshRuler(snapped);
    return this.end !== null;
  }

  previewMeasurement(point:Point):string {
    if (!this.start) return 'Régua: clique no início da passagem.';
    const end=this.end ?? {x:snapBuildingCoordinate(point.x,'wall'),z:snapBuildingCoordinate(point.z,'wall')};
    this.refreshRuler(end);
    const dx=Math.abs(end.x-this.start.x),dz=Math.abs(end.z-this.start.z),length=Math.hypot(dx,dz);
    return `${(length/BUILD_TILE_SIZE).toFixed(1)} tiles de construção · X ${(dx/BUILD_TILE_SIZE).toFixed(1)} / Z ${(dz/BUILD_TILE_SIZE).toFixed(1)} · ${(length/WORLD.tileSize).toFixed(1)} tiles de terreno`;
  }

  clearMeasurement():void {
    this.start=null; this.end=null; this.rulerKey=''; this.ruler.visible=false;
  }

  private refreshRuler(preview?:Point):void {
    const end=this.end ?? preview;
    if (!this.start || !end) return;
    const start=this.start,dx=end.x-start.x,dz=end.z-start.z,length=Math.hypot(dx,dz);
    const key=`${start.x},${start.z}:${end.x},${end.z}`;
    if (key===this.rulerKey) return;
    this.rulerKey=key;
    const points:number[]=[];
    const vertex=(x:number,z:number)=>points.push(x,this.world.heightAt(x,z)+0.3,z);
    const count=Math.max(1,Math.ceil(length));
    for(let i=0;i<count;i++) { vertex(start.x+dx*i/count,start.z+dz*i/count); vertex(start.x+dx*(i+1)/count,start.z+dz*(i+1)/count); }
    const spacing=(length/BUILD_TILE_SIZE>100 ? 5 : 1)*BUILD_TILE_SIZE;
    if(length>0) for(let d=0;d<=length;d+=spacing) {
      const x=start.x+dx*d/length,z=start.z+dz*d/length,size=Math.round(d/BUILD_TILE_SIZE)%5===0 ? 0.6 : 0.25;
      vertex(x-dz/length*size,z+dx/length*size); vertex(x+dz/length*size,z-dx/length*size);
    }
    this.replaceLines(this.ruler,points); this.ruler.visible=true;
  }
}
