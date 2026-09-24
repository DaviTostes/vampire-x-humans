export interface ViewRect { left:number;top:number;width:number;height:number }
export function pointerInside(rect:ViewRect,x:number,y:number):boolean {
  return rect.width>0 && rect.height>0 && x>=rect.left && y>=rect.top && x<rect.left+rect.width && y<rect.top+rect.height;
}

/** Screen axes map to world X/Z; corners preserve the strongest edge's speed. */
export function edgeMovement(rect:ViewRect,x:number,y:number,zone:number):{x:number;z:number} {
  if(!pointerInside(rect,x,y))return {x:0,z:0};
  const axis=(p:number,length:number)=>{
    const size=Math.min(zone,length/2);
    return p<size ? -(1-p/size) : p>length-size ? 1-(length-p)/size : 0;
  };
  const dx=axis(x-rect.left,rect.width),dz=axis(y-rect.top,rect.height);
  const strength=Math.max(Math.abs(dx),Math.abs(dz)),length=Math.hypot(dx,dz);
  return length?{x:dx/length*strength,z:dz/length*strength}:{x:0,z:0};
}

export function progressiveSpeed(strength:number,min:number,max:number):number {
  return min*strength+(max-min)*strength*strength;
}

/** Exact exponential integration avoids frame-rate dependent acceleration. */
export function integratePan(current:number,target:number,dt:number,response:number) {
  const decay=Math.exp(-response*dt);
  return {velocity:target+(current-target)*decay,displacement:target*dt+(current-target)*(1-decay)/response};
}
