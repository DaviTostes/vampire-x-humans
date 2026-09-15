import * as THREE from 'three';

/** Small, repeated cliff stones do not need the full prop mesh. Cluster nearby
 * vertices in model space, keeping original UVs and removing collapsed faces.
 * The original GLB and the standalone rock prop remain unchanged. */
export function simplifyReliefGeometry(source: THREE.BufferGeometry, divisions = 10): THREE.BufferGeometry {
  source.computeBoundingBox();
  const box = source.boundingBox!;
  const extent = box.getSize(new THREE.Vector3());
  const cell = Math.max(extent.x, extent.y, extent.z) / divisions;
  if (!(cell > 0)) return source.clone();
  const position = source.getAttribute('position');
  const representatives: number[] = [];
  const remap = new Uint32Array(position.count);
  const clusters = new Map<string, number>();
  for (let i = 0; i < position.count; i++) {
    const key = `${Math.round((position.getX(i)-box.min.x)/cell)},${Math.round((position.getY(i)-box.min.y)/cell)},${Math.round((position.getZ(i)-box.min.z)/cell)}`;
    let target = clusters.get(key);
    if (target === undefined) {
      target = representatives.length;
      representatives.push(i); clusters.set(key,target);
    }
    remap[i] = target;
  }
  const indices: number[] = [];
  const seen = new Set<string>();
  const count = source.index?.count ?? position.count;
  for (let i = 0; i < count; i += 3) {
    const a = remap[source.index ? source.index.getX(i) : i]!;
    const b = remap[source.index ? source.index.getX(i+1) : i+1]!;
    const c = remap[source.index ? source.index.getX(i+2) : i+2]!;
    if (a === b || b === c || a === c) continue;
    const key = [a,b,c].sort((x,y) => x-y).join(',');
    if (seen.has(key)) continue;
    seen.add(key); indices.push(a,b,c);
  }
  if (!indices.length) return source.clone();
  const result = new THREE.BufferGeometry();
  for (const [name,attribute] of Object.entries(source.attributes)) {
    if (name === 'normal') continue;
    const values = new Float32Array(representatives.length*attribute.itemSize);
    representatives.forEach((original,i) => {
      for (let c = 0; c < attribute.itemSize; c++) values[i*attribute.itemSize+c] = attribute.getComponent(original,c);
    });
    result.setAttribute(name,new THREE.BufferAttribute(values,attribute.itemSize));
  }
  result.setIndex(indices);
  result.computeVertexNormals();
  result.computeBoundingSphere();
  return result;
}
