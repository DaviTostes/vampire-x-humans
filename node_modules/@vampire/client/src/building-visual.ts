import * as THREE from 'three';
import { BUILDING_SIZE, WORLD, type BuildingKind } from '@vampire/shared';

/** Visual fit only: no collider or logical footprint is derived from the model. */
export function fitBuildingVisual(visual:THREE.Object3D,kind:BuildingKind,level=1):void {
  visual.updateMatrixWorld(true);
  const size=new THREE.Box3().setFromObject(visual).getSize(new THREE.Vector3());
  const footprint=BUILDING_SIZE[kind];
  const tent=(kind==='bank' && level<=3)||(kind==='market' && level<3);
  const evolvedMarket=kind==='market' && level>=3;
  const heightLimit=kind==='crypt'?12:kind==='tower'?7.6:evolvedMarket?8:footprint===WORLD.tileSize*4?WORLD.tileSize*3.2:3.8;
  const coverage=kind==='tower'||evolvedMarket?0.98:0.94;
  const scale=kind==='wall' ? footprint*0.97/Math.max(size.x,size.z,0.001) :
    Math.min(footprint*coverage/Math.max(size.x,size.z,0.001),heightLimit/Math.max(size.y,0.001))*(tent?0.8:1);
  visual.scale.multiplyScalar(scale);visual.updateMatrixWorld(true);
  const bounds=new THREE.Box3().setFromObject(visual),center=bounds.getCenter(new THREE.Vector3());
  visual.position.x-=center.x;visual.position.z-=center.z;visual.position.y-=bounds.min.y;
  visual.updateMatrixWorld(true);
}
