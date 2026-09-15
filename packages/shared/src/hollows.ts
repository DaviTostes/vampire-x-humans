import { WORLD, type MapPresetConfig } from './constants.js';
import type { Compound, GameMap, MapModel, MapOverlay, ResourcePlacement } from './mapgen.js';
import { RELIEF_STEP, carveTerrainStair, terrainHeight, type TerrainStair } from './terrain.js';

type Point = { x:number; z:number };
type XY = readonly [number,number];
interface BasePlan { name:string; center:XY; outline:XY[]; gates:XY[]; feature:string }
// World coordinates, snapped to the existing 2-unit terrain grid. These are
// authored rooms carved out of a shared rocky mass, not rotated template islands.
export const HOLLOW_BASES: BasePlan[] = [
  {name:'Recanto dos Cedros',center:[-66,-64],outline:[[-86,-80],[-48,-80],[-48,-62],[-38,-62],[-38,-38],[-64,-38],[-64,-48],[-86,-48]],gates:[[-52,-38]],feature:'Planta em L; abrigo de fundos e acesso pelo braco curto.'},
  {name:'Fenda dos Corvos',center:[70,-60],outline:[[38,-82],[70,-84],[88,-66],[80,-42],[56,-36],[38,-48]],gates:[[38,-60],[60,-38]],feature:'Rochedo interno divide a arena; duas entradas para defender.'},
  {name:'Vigia da Nascente',center:[76,4],outline:[[58,-18],[86,-22],[94,-2],[88,28],[64,32],[56,16]],gates:[[58,8]],feature:'Base estreita e profunda; entrada lateral protegida.'},
  {name:'Pátio das Pedras',center:[48,62],outline:[[32,48],[52,40],[90,42],[92,78],[64,88],[36,72]],gates:[[48,42]],feature:'Maior patio; ilha de pedra interna e uma escada frontal.'},
  {name:'Abrigo das Raízes',center:[-70,64],outline:[[-86,42],[-52,42],[-48,58],[-28,58],[-28,84],[-62,88],[-90,70]],gates:[[-68,42],[-28,70]],feature:'Dois bolsoes ligados por cotovelo; acesso frontal e rota secundaria.'},
  {name:'Porta do Bosque',center:[-76,0],outline:[[-96,-20],[-62,-24],[-46,-8],[-50,18],[-70,26],[-96,16]],gates:[[-48,4]],feature:'Patio transversal largo atras de uma aproximacao em curva.'},
];
const asPoint=([x,z]:XY):Point=>({x,z});
const central:XY[]=[[-22,-22],[18,-24],[28,-8],[22,24],[6,30],[-24,16]];
const land:XY[]=[[-108,-88],[-86,-96],[72,-96],[100,-78],[106,-12],[102,80],[72,96],[-58,98],[-104,78],[-110,10]];
const spines:XY[][]=[[[58,-72],[64,-72],[64,-50],[58,-50]],[[64,52],[74,54],[78,62],[68,70],[60,62]]];
interface Route { points:Point[]; width:number; paving:number }
const route=(points:XY[],width=6,paving=2.8):Route=>({points:points.map(asPoint),width,paving});
const routes:Route[]=[
  // Bent circulation loop and short links through the central fighting space.
  route([[-30,-26],[0,-36],[28,-26],[36,0],[30,30],[0,40],[-30,30],[-36,0],[-30,-26]]),
  route([[-30,-26],[-18,-10],[0,0],[18,0],[36,0]]),
  route([[28,-26],[14,-14],[0,0],[-16,12],[-30,30]]),
  route([[0,0],[12,18],[30,30]]),route([[0,20],[0,40]]),route([[-36,0],[-18,0]]),
  // Approaches stop at the cliff boundary; the existing stair brush opens it.
  route([[-30,-26],[-48,-28],[-52,-38]],6),
  route([[28,-26],[28,-58],[38,-60]],5.5),
  route([[28,-26],[44,-28],[60,-38]],5),
  route([[36,0],[46,8],[58,8]],5.5),
  route([[30,30],[48,32],[48,42]],6),
  route([[-30,30],[-56,30],[-68,42]],5.5),
  route([[-36,0],[-40,12],[-48,4]],5.5),
  // Narrow alternate routes: NW bypass, NE flank and the southern loop.
  route([[-48,-28],[-48,-16],[-40,12]],4.5,1.1),
  route([[44,-28],[48,-20],[46,8]],4.5,1.1),
  route([[-28,70],[-18,70],[0,62],[20,54],[48,32]],5,1.3),
  route([[0,40],[0,62]],5,1.3),
];
function inside(ring:Point[],x:number,z:number):boolean {
  let hit=false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++) {
    const a=ring[i]!,b=ring[j]!;
    if((a.z>z)!==(b.z>z)&&x<(b.x-a.x)*(z-a.z)/(b.z-a.z)+a.x)hit=!hit;
  }
  return hit;
}
function distanceToLine(points:Point[],x:number,z:number):number {
  let best=Infinity;
  for(let i=1;i<points.length;i++) {
    const a=points[i-1]!,b=points[i]!,dx=b.x-a.x,dz=b.z-a.z;
    const t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz||1)));
    best=Math.min(best,Math.hypot(x-a.x-dx*t,z-a.z-dz*t));
  }
  return best;
}

export function buildHollowsMap(config:MapPresetConfig,overlay:MapOverlay|null):MapModel {
  const n=WORLD.tiles,ts=WORLD.tileSize,half=WORLD.half;
  const floor=0.1,terrace=floor+RELIEF_STEP,ridge=terrace+RELIEF_STEP;
  const rings=HOLLOW_BASES.map(b=>b.outline.map(asPoint)),landRing=land.map(asPoint),arena=central.map(asPoint);
  const spineRings=spines.map(p=>p.map(asPoint));
  const paths=routes.map(r=>({...r,points:r.points.map(p=>({...p}))}));
  const isLandAt=(x:number,z:number)=>inside(landRing,x,z);
  const isWaterAtWorld=(x:number,z:number)=>!isLandAt(x,z);
  const map:GameMap={id:'hollows',seed:config.version,tiles:n,height:new Float32Array(n*n),water:new Uint8Array(n*n),bridge:new Uint8Array(n*n),forest:new Float32Array(n*n),obstacles:[]};
  for(let z=0;z<n;z++)for(let x=0;x<n;x++) {
    const wx=x*ts-half,wz=z*ts-half,i=z*n+x;
    const base=rings.some(r=>inside(r,wx,wz));
    map.water[i]=isWaterAtWorld(wx,wz)?1:0;
    map.height[i]=map.water[i]?floor:spineRings.some(r=>inside(r,wx,wz))?ridge:base?terrace:
      inside(arena,wx,wz)||paths.some(r=>distanceToLine(r.points,wx,wz)<=r.width)?floor:ridge;
  }
  const compounds:Compound[]=HOLLOW_BASES.map((b,i)=>{
    const xs=rings[i]!.map(p=>p.x),zs=rings[i]!.map(p=>p.z);
    return {...asPoint(b.center),name:b.name,width:Math.max(...xs)-Math.min(...xs),depth:Math.max(...zs)-Math.min(...zs),
      facing:'south',style:'jagged',variant:i,entranceWidth:8,wallThickness:4,wallHeight:RELIEF_STEP*14,approach:8};
  });
  const authoredStairs:TerrainStair[]=[];
  HOLLOW_BASES.forEach((base,i)=>base.gates.forEach((gate,gi)=>{
    const target=asPoint(gate);
    const approaches:XY[][]=[[[0,-1]],[[1,0],[0,-1]],[[1,0]],[[0,1]],[[0,1],[-1,0]],[[-1,0]]];
    const [dx,dz]=approaches[i]![gi]!;
    // Level both landings inside the surrounding rocky mass before applying
    // the same stair brush as the editor. No ridge may pinch the approach.
    for(let along=-14;along<=6;along+=ts)for(let side=-6;side<=6;side+=ts){
      const x=target.x+dx*along-dz*side,z=target.z+dz*along+dx*side;
      const index=Math.round((z+half)/ts)*n+Math.round((x+half)/ts);
      if(map.water[index])throw new Error(`Entrada na agua: ${base.name}`);
      map.height[index]=along<0?floor:terrace;
    }
    const stair=carveTerrainStair(map,target.x,target.z,2);
    if(!stair)throw new Error(`Escada indisponivel: ${base.name} / ${gi}`);
    authoredStairs.push(stair);
    const top={x:stair.x+stair.dx*(stair.length+4),z:stair.z+stair.dz*(stair.length+4)};
    const bottom={x:stair.x-stair.dx*2,z:stair.z-stair.dz*2};
    if(!gi)compounds[i]!.door=top;
    // Keep internal paving bent; do not draw a road through the central spine.
    const bend=i===1?{x:top.x,z:-44}:i===4?{x:-66,z:72}:top;
    paths.push({points:[bottom,top,bend,asPoint(base.center)],width:4,paving:1.8});
  }));
  // Saved grids override this authored map exactly as they do in the old preset.
  if(overlay?.height?.length===n*n)for(let i=0;i<n*n;i++){
    const h=overlay.height[i];if(!map.water[i]&&Number.isFinite(h))map.height[i]=Math.max(0,Math.min(1.2,h!));
  }
  for(const i of overlay?.adds??[])if(Number.isInteger(i)&&i>=0&&i<n*n)map.obstacles.push({x:(i%n+0.5)*ts-half,z:(Math.floor(i/n)+0.5)*ts-half,width:ts,depth:ts,height:4.5});
  const stairs=overlay?.height?overlay.stairs??[]:authoredStairs;
  const trails=paths.map(r=>r.points);
  const distanceToTrails=(x:number,z:number)=>Math.min(...trails.map(line=>distanceToLine(line,x,z)));
  const cryptPosition=asPoint([0,8]),vampireSpawnOffset=asPoint([14,12]);
  const humanSpawns=config.humanSpawns.map(p=>({...p}));
  const spawns=[...humanSpawns,{x:14,z:20}];
  const flat=(x:number,z:number,radius=3)=>{
    const h=terrainHeight(map,x,z);
    return [[0,0],[radius,0],[-radius,0],[0,radius],[0,-radius]].every(([dx,dz])=>isLandAt(x+dx!,z+dz!)&&Math.abs(terrainHeight(map,x+dx!,z+dz!)-h)<0.01);
  };
  const isForestAt=(x:number,z:number)=>isLandAt(x,z)&&flat(x,z)&&terrainHeight(map,x,z)>terrace+0.1&&distanceToTrails(x,z)>7;
  const resources:ResourcePlacement[]=[];
  const safe=(x:number,z:number)=>flat(x,z)&&!spawns.some(p=>Math.hypot(x-p.x,z-p.z)<6)&&Math.hypot(x,z-8)>15&&
    !resources.some(p=>Math.hypot(x-p.x,z-p.z)<5)&&!map.obstacles.some(o=>Math.abs(x-o.x)<o.width/2+4&&Math.abs(z-o.z)<o.depth/2+4);
  for(const [ci,c] of compounds.entries()) {
    const xs=rings[ci]!.map(p=>p.x),zs=rings[ci]!.map(p=>p.z);
    const candidates:Point[]=[];
    const random=(x:number,z:number)=>{const v=Math.sin(x*12.9898+z*78.233+ci*19.17)*43758.5453;return v-Math.floor(v);};
    for(let z=Math.min(...zs)+6;z<Math.max(...zs)-4;z+=6)for(let x=Math.min(...xs)+6;x<Math.max(...xs)-4;x+=6){
      const px=x+(random(x,z)-0.5)*1.2,pz=z+(random(z,x)-0.5)*1.2;
      if(!inside(rings[ci]!,px,pz)||Math.abs(terrainHeight(map,px,pz)-terrace)>0.01||distanceToTrails(px,pz)<5||Math.hypot(px-c.x,pz-c.z)<8||!safe(px,pz))continue;
      candidates.push({x:px,z:pz});
    }
    candidates.sort((a,b)=>random(a.x,a.z)-random(b.x,b.z));
    let wood=0,gold=0;
    for(const point of candidates){
      if(!safe(point.x,point.z))continue;
      if(!gold){resources.push({kind:'gold',...point});gold++;}
      else if(wood<[8,10,7,12,9,8][ci]!){resources.push({kind:'wood',...point});wood++;}
    }
  }
  // Contestable supplies in the central clearing's shoulders, off the lanes.
  for(const [x,z] of [[-14,16],[20,-14],[-8,-26],[6,26]] as XY[])if(safe(x,z)&&distanceToTrails(x,z)>4)resources.push({kind:'gold',x,z});
  // Wood inside rooms is harvestable; woods on inaccessible ridges are decor,
  // never resource targets that send workers into an unreachable cliff.
  const forestWoodNodes=resources.filter((r):r is {kind:'wood';x:number;z:number}=>r.kind==='wood');
  const paint=Array.from({length:n*n},(_,i)=>{
    if(overlay?.paint?.[i]!==undefined)return overlay.paint[i]!;
    const x=(i%n+0.5)*ts-half,z=(Math.floor(i/n)+0.5)*ts-half;
    return isLandAt(x,z)&&terrainHeight(map,x,z)<ridge-0.1&&paths.some(r=>distanceToLine(r.points,x,z)<r.paving)?1:0;
  });
  for(let i=0;i<n*n;i++)map.forest[i]=isForestAt((i%n)*ts-half,Math.floor(i/n)*ts-half)?0.8:0;
  return {id:'hollows',config,compounds,trails,humanSpawns,cryptPosition,vampireSpawnOffset,bridges:[],resourcePlacements:resources,forestWoodNodes,
    obstacles:map.obstacles,refugeRings:rings,refugeWalls:compounds.map(()=>[]),stairs,paint,
    compoundEntrance:c=>c.door??{x:c.x,z:c.z},isLandAt,isWaterAtWorld,isBridgeAtWorld:()=>false,distanceToTrails,isForestAt,
    generateMap:()=>({...map,height:map.height.slice(),water:map.water.slice(),bridge:map.bridge.slice(),forest:map.forest.slice(),obstacles:map.obstacles.map(o=>({...o}))})};
}
