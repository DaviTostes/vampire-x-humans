import * as THREE from 'three';
import { DEFAULT_MAP_BOUNDARY, insideMapBoundary, insidePlayableBoundary } from '@vampire/shared';
import type { GameScene } from './scene.js';
import { RTS_CAMERA } from './camera.js';
import { edgeMovement, pointerInside } from './camera-motion.js';
import { progressiveSpeed, integratePan } from './camera-motion.js';

/** Owns all gameplay camera input. Camera transforms run only in update(). */
export class CameraController {
  private readonly listeners=new AbortController();
  private keys=new Set<string>();
  private mouse:{x:number;y:number}|null=null;
  private dragging=false;
  private drag=new THREE.Vector2();
  private velocity=new THREE.Vector2();
  private wheel=0;
  private zoom:number=RTS_CAMERA.initialZoom;
  private camTarget=new THREE.Vector3();
  private safeCameraTarget:{x:number;z:number}|null=null;
  private pendingFocus:{x:number;z:number}|null=null;
  private readonly minimumGround:number;
  private readonly movementKeys=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight']);

  constructor(private readonly scene:GameScene) {
    this.minimumGround=scene.map.height.reduce((low,h)=>Math.min(low,h*14),0);
    const signal=this.listeners.signal,canvas=scene.renderer.domElement;
    document.addEventListener('pointermove',e=>this.updateMousePosition(e),{signal,capture:true});
    document.addEventListener('pointerout',e=>{if(!e.relatedTarget)this.resetInput();},{signal});
    document.addEventListener('pointercancel',()=>this.resetInput(),{signal});
    canvas.addEventListener('pointerleave',e=>{
      if(!pointerInside(canvas.getBoundingClientRect(),e.clientX,e.clientY))this.resetInput();
    },{signal});
    canvas.addEventListener('pointerdown',e=>{
      if(e.button!==1 || this.isBlocked())return;
      e.preventDefault();this.updateMousePosition(e);this.dragging=true;this.velocity.set(0,0);
    },{signal});
    window.addEventListener('pointerup',e=>{if(e.button===1){this.dragging=false;this.drag.set(0,0);}},{signal});
    canvas.addEventListener('auxclick',e=>{if(e.button===1)e.preventDefault();},{signal});
    canvas.addEventListener('wheel',e=>this.handleZoom(e),{signal,passive:false});
    window.addEventListener('keydown',e=>{
      if(!this.movementKeys.has(e.code) || this.isBlocked() || !this.mouse)return;
      e.preventDefault();this.keys.add(e.code);
    },{signal});
    window.addEventListener('keyup',e=>this.keys.delete(e.code),{signal});
    window.addEventListener('blur',()=>this.resetInput(),{signal});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)this.resetInput();},{signal});
    document.addEventListener('focusin',()=>{if(this.isBlocked())this.resetInput();},{signal});
  }

  isBlocked():boolean {
    if(document.hidden || !document.hasFocus())return true;
    const active=document.activeElement;
    if(active instanceof HTMLElement && active.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"])'))return true;
    return [...document.querySelectorAll<HTMLElement>('[data-block-map-controls="true"],[aria-modal="true"],dialog[open],.vxh-modal:not([hidden])')]
      .some(el=>el.getClientRects().length>0 && getComputedStyle(el).visibility!=='hidden');
  }

  private resetInput():void {
    this.mouse=null;this.keys.clear();this.dragging=false;this.drag.set(0,0);this.velocity.set(0,0);this.wheel=0;
  }

  updateMousePosition(e:PointerEvent):void {
    if(e.pointerType==='touch' || !pointerInside(this.scene.renderer.domElement.getBoundingClientRect(),e.clientX,e.clientY) || this.isBlocked()) {
      this.resetInput();return;
    }
    if(this.dragging && this.mouse) {
      if(!(e.buttons&4)){this.dragging=false;this.drag.set(0,0);}
      else this.drag.add(new THREE.Vector2(e.clientX-this.mouse.x,e.clientY-this.mouse.y));
    }
    this.mouse={x:e.clientX,y:e.clientY};
  }

  calculateEdgeMovement():{x:number;z:number} {
    const rect=this.scene.renderer.domElement.getBoundingClientRect();
    return this.mouse?edgeMovement(rect,this.mouse.x,this.mouse.y,RTS_CAMERA.edgeSize):{x:0,z:0};
  }

  handleZoom(e:WheelEvent):void {
    if(this.isBlocked())return;
    e.preventDefault();
    const rect=this.scene.renderer.domElement.getBoundingClientRect();
    if(!pointerInside(rect,e.clientX,e.clientY))return;
    this.wheel+=e.deltaY*(e.deltaMode===1?RTS_CAMERA.wheelLinePixels:e.deltaMode===2?rect.height:1);
  }

  private handleMouseDrag():void {
    const rect=this.scene.renderer.domElement.getBoundingClientRect();
    const scale=2*RTS_CAMERA.distance*this.zoom*Math.tan(THREE.MathUtils.degToRad(this.scene.camera.fov/2))/Math.max(1,rect.height);
    const pitch=Math.atan2(RTS_CAMERA.elevation,RTS_CAMERA.depth);
    this.camTarget.x-=this.drag.x*scale*RTS_CAMERA.middleDragSpeed;
    this.camTarget.z-=this.drag.y*scale/Math.sin(pitch)*RTS_CAMERA.middleDragSpeed;
    this.drag.set(0,0);
  }

  private moveCamera(dt:number):void {
    if(this.dragging){this.handleMouseDrag();return;}
    const k=this.keys;
    let x=Number(k.has('KeyD')||k.has('ArrowRight'))-Number(k.has('KeyA')||k.has('ArrowLeft'));
    let z=Number(k.has('KeyS')||k.has('ArrowDown'))-Number(k.has('KeyW')||k.has('ArrowUp'));
    if(x||z){const length=Math.hypot(x,z);x/=length;z/=length;}
    else ({x,z}=this.calculateEdgeMovement());
    const strength=Math.hypot(x,z);
    if(!strength){this.velocity.set(0,0);return;}
    const speed=progressiveSpeed(strength,RTS_CAMERA.speedMin,RTS_CAMERA.speedMax)*this.zoom;
    const panX=integratePan(this.velocity.x,x/strength*speed,dt,RTS_CAMERA.smoothing);
    const panZ=integratePan(this.velocity.y,z/strength*speed,dt,RTS_CAMERA.smoothing);
    this.velocity.set(panX.velocity,panZ.velocity);
    this.camTarget.x+=panX.displacement;this.camTarget.z+=panZ.displacement;
  }

  focusOn(x:number,z:number):void {if(Number.isFinite(x)&&Number.isFinite(z))this.pendingFocus={x,z};}

  update(deltaTime:number):void {
    const dt=Math.min(RTS_CAMERA.maxDeltaTime,Math.max(0,deltaTime));
    if(this.mouse && !pointerInside(this.scene.renderer.domElement.getBoundingClientRect(),this.mouse.x,this.mouse.y))this.resetInput();
    if(this.isBlocked()){this.resetInput();return;}
    if(this.pendingFocus) {
      this.camTarget.set(this.pendingFocus.x,this.scene.heightAt(this.pendingFocus.x,this.pendingFocus.z),this.pendingFocus.z);
      this.pendingFocus=null;this.velocity.set(0,0);
    } else if(this.mouse)this.moveCamera(dt);
    this.zoom=THREE.MathUtils.clamp(this.zoom+this.wheel*RTS_CAMERA.wheelSensitivity,RTS_CAMERA.minZoom,RTS_CAMERA.maxZoom);this.wheel=0;
    this.clampToMapBounds();
    const ground=this.scene.heightAt(this.camTarget.x,this.camTarget.z);
    this.camTarget.y+=(ground-this.camTarget.y)*(1-Math.exp(-RTS_CAMERA.heightSmoothing*dt));
    this.clampToMapBounds();
    const distance=RTS_CAMERA.distance*this.zoom;
    this.scene.camera.position.set(this.camTarget.x,this.camTarget.y+distance*RTS_CAMERA.elevation,this.camTarget.z+distance*RTS_CAMERA.depth);
    this.scene.camera.lookAt(this.camTarget);
    this.scene.setShadowFocus(this.camTarget.x,this.camTarget.z);
  }

  dispose():void {this.listeners.abort();this.resetInput();}

  clampToMapBounds() {
    const dist = RTS_CAMERA.distance * this.zoom;
    const vf = THREE.MathUtils.degToRad(this.scene.camera.fov) / 2;
    const pitch = Math.atan(RTS_CAMERA.elevation / RTS_CAMERA.depth);
    const h = dist * RTS_CAMERA.elevation + Math.max(0,this.camTarget.y-this.minimumGround);
    const near = h / Math.tan(pitch + vf);
    const farG = h / Math.tan(Math.max(0.02, pitch - vf));
    const D = dist * RTS_CAMERA.depth;
    // The camera may see the perspective margin, so constrain its viewport to
    // the physical contour, not to the inset used for units and buildings.
    const boundary=this.scene.map.boundary ?? DEFAULT_MAP_BOUNDARY;
    const minX=Math.min(...boundary.map(p=>p.x)), maxX=Math.max(...boundary.map(p=>p.x));
    const minZ=Math.min(...boundary.map(p=>p.z)), maxZ=Math.max(...boundary.map(p=>p.z));
    // Margem de segurança pequena: com a folga do recorte, não corta as bordas.
    const marginX = h*Math.tan(vf)*this.scene.camera.aspect/(Math.sin(pitch)-Math.cos(pitch)*Math.tan(vf))*RTS_CAMERA.viewportSafety;
    const marginZback = farG - D;
    const marginZfront = Math.max(0, D - near);
    const loX = minX + marginX, hiX = maxX - marginX;
    const loZ = minZ + marginZback, hiZ = maxZ - marginZfront;
    this.camTarget.x = loX <= hiX ? THREE.MathUtils.clamp(this.camTarget.x, loX, hiX) : (minX + maxX) / 2;
    this.camTarget.z = loZ <= hiZ ? THREE.MathUtils.clamp(this.camTarget.z, loZ, hiZ) : (minZ + maxZ) / 2;
    const offsetZ=(marginZfront-marginZback)/2, halfZ=(marginZfront+marginZback)/2;
    const fits=(x:number,z:number)=>insidePlayableBoundary(this.scene.map,x,z) && insideMapBoundary(this.scene.map,x,z+offsetZ,marginX,halfZ);
    if(!fits(this.camTarget.x,this.camTarget.z)) {
      let safe=this.safeCameraTarget;
      if(!safe || !fits(safe.x,safe.z)) {
        safe=null;
        let best=Infinity;
        for(let z=loZ;z<=hiZ;z+=RTS_CAMERA.boundsSearchStep) for(let x=loX;x<=hiX;x+=RTS_CAMERA.boundsSearchStep) {
          const distance=(x-this.camTarget.x)**2+(z-this.camTarget.z)**2;
          if(distance<best && fits(x,z)) { safe={x,z}; best=distance; }
        }
      }
      if(safe) {
        const dx=this.camTarget.x-safe.x,dz=this.camTarget.z-safe.z;
        let lo=0,hi=1;
        for(let i=0;i<RTS_CAMERA.boundsIterations;i++) {
          const t=(lo+hi)/2;
          if(fits(safe.x+dx*t,safe.z+dz*t)) lo=t; else hi=t;
        }
        this.camTarget.x=safe.x+dx*lo; this.camTarget.z=safe.z+dz*lo;
      } else if(this.zoom>RTS_CAMERA.minZoom) {
        this.zoom=Math.max(RTS_CAMERA.minZoom,this.zoom*RTS_CAMERA.zoomFitFactor);
        this.clampToMapBounds(); return;
      }
    }
    if(fits(this.camTarget.x,this.camTarget.z)) this.safeCameraTarget={x:this.camTarget.x,z:this.camTarget.z};
  }


}
