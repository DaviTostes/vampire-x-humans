import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as THREE from 'three';
import { getMapModel, insideMapBoundary, insidePlayableBoundary } from '@vampire/shared';
import { CameraController } from '../../client/src/camera-controller.js';
import { edgeMovement, integratePan, progressiveSpeed } from '../../client/src/camera-motion.js';
import { RTS_CAMERA } from '../../client/src/camera.js';

test('edge speed is progressive, canvas-relative and normalized at corners',()=>{
  const rect={left:100,top:60,width:800,height:600};
  assert.deepEqual(edgeMovement(rect,90,60,25),{x:0,z:0});
  assert.deepEqual(edgeMovement(rect,500,300,25),{x:0,z:0});
  assert.equal(edgeMovement(rect,100,300,25).x,-1);
  assert.ok(edgeMovement(rect,899,300,25).x>edgeMovement(rect,880,300,25).x);
  const diagonal=edgeMovement(rect,100,60,25);assert.ok(Math.abs(Math.hypot(diagonal.x,diagonal.z)-1)<1e-12);
  assert.ok(progressiveSpeed(0.9,6,60)>progressiveSpeed(0.2,6,60));
});

test('accelerated pan travels the same distance at 30, 60 and 144 FPS',()=>{
  const distances=[30,60,144].map(fps=>{
    let v=0,distance=0;
    for(let i=0;i<fps*2;i++){const next=integratePan(v,60,1/fps,6);v=next.velocity;distance+=next.displacement;}
    return distance;
  });
  assert.ok(Math.max(...distances)-Math.min(...distances)<1e-8);
});

test('controller integrates HUD edges, drag, zoom, focus, resize, boundaries and input resets',()=>{
  class Element extends EventTarget {
    editing=false;
    rect={left:100,top:60,width:1000,height:700};
    closest(){return this.editing?this:null;}
    getBoundingClientRect(){return this.rect;}
    getClientRects(){return [this.rect];}
  }
  const win=new EventTarget(),doc=Object.assign(new EventTarget(),{hidden:false,activeElement:null as Element|null,
    focused:true,modals:[] as Element[],hasFocus(){return this.focused;},querySelectorAll(){return this.modals;}});
  const originals=new Map(['window','document','HTMLElement','getComputedStyle'].map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]));
  Object.defineProperties(globalThis,{window:{value:win,configurable:true},document:{value:doc,configurable:true},
    HTMLElement:{value:Element,configurable:true},getComputedStyle:{value:()=>({visibility:'visible'}),configurable:true}});
  const canvas=new Element(),map=getMapModel('flat').generateMap();
  const camera=new THREE.PerspectiveCamera(RTS_CAMERA.fov,1000/700,0.1,2000);
  let target={x:0,z:0};
  const scene={renderer:{domElement:canvas},camera,map,heightAt:()=>0,setShadowFocus:(x:number,z:number)=>{target={x,z};}};
  const controller=new CameraController(scene as never);
  const event=(node:EventTarget,type:string,props:Record<string,unknown>={})=>node.dispatchEvent(Object.assign(new Event(type,{cancelable:true}),props));
  const pointer=(x:number,y:number,buttons=0)=>event(doc,'pointermove',{clientX:x,clientY:y,buttons,pointerType:'mouse'});
  const advance=()=>{for(let i=0;i<60;i++)controller.update(1/60);};
  try {
    controller.focusOn(0,0);controller.update(1/60);
    const rotation=camera.quaternion.clone();
    pointer(1099,300);advance();assert.ok(target.x>0,'document events over ordinary HUD still scroll');
    const moved=target.x;pointer(1101,300);advance();assert.equal(target.x,moved,'leaving canvas stops immediately');
    pointer(101,300);event(win,'blur');advance();assert.equal(target.x,moved,'blur clears inputs');
    pointer(1099,300);doc.modals=[new Element()];advance();assert.equal(target.x,moved,'modal blocks movement');doc.modals=[];
    pointer(1099,300);const field=new Element();field.editing=true;doc.activeElement=field;advance();assert.equal(target.x,moved);doc.activeElement=null;
    pointer(500,300);event(win,'keydown',{code:'KeyW'});advance();event(win,'keyup',{code:'KeyW'});assert.ok(target.z<0);
    const beforeDrag=target.x;event(canvas,'pointerdown',{button:1,clientX:500,clientY:300,buttons:4,pointerType:'mouse'});
    pointer(540,300,4);controller.update(1/60);event(win,'pointerup',{button:1});assert.ok(target.x<beforeDrag);
    assert.ok(camera.quaternion.angleTo(rotation)<1e-6,'pan preserves viewing angle');
    event(canvas,'wheel',{deltaY:100000,deltaMode:0,clientX:500,clientY:300});controller.update(1/60);
    assert.ok(camera.position.y<=RTS_CAMERA.distance*RTS_CAMERA.maxZoom*RTS_CAMERA.elevation+1e-6);
    canvas.rect={left:220,top:80,width:1400,height:700};camera.aspect=2;camera.updateProjectionMatrix();
    controller.focusOn(10000,10000);controller.update(1/60);
    assert.ok(insidePlayableBoundary(map,target.x,target.z));
    camera.updateMatrixWorld(true);
    for(const x of [-1,1])for(const y of [-1,1]) {
      const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(x,y),camera);
      const point=ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),new THREE.Vector3())!;
      assert.ok(insideMapBoundary(map,point.x,point.z),'visible viewport remains within physical boundary');
    }
    map.boundary=[{x:-260,z:-260},{x:0,z:-260},{x:0,z:-100},{x:260,z:-100},{x:260,z:260},{x:-260,z:260}];
    for(const aspect of [1,16/9,3.2])for(const wheel of [-100000,100000]) {
      camera.aspect=aspect;camera.updateProjectionMatrix();
      event(canvas,'wheel',{deltaY:wheel,deltaMode:0,clientX:500,clientY:300});
      controller.focusOn(1000,-1000);controller.update(1/60);camera.updateMatrixWorld(true);
      assert.ok(insidePlayableBoundary(map,target.x,target.z));
      for(const x of [-1,0,1])for(const y of [-1,0,1]) {
        const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(x,y),camera);
        const point=ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),new THREE.Vector3())!;
        assert.ok(insideMapBoundary(map,point.x,point.z),`irregular boundary, aspect ${aspect}, zoom ${wheel}`);
      }
    }
    const end=target.x;controller.dispose();pointer(221,200);advance();assert.equal(target.x,end,'disposed listeners cannot move camera');
  } finally {
    controller.dispose();for(const [key,descriptor] of originals)if(descriptor)Object.defineProperty(globalThis,key,descriptor);else Reflect.deleteProperty(globalThis,key);
  }
});
