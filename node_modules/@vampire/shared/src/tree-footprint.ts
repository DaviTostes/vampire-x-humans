import { BUILD_TILE_SIZE, WORLD } from './constants.js';

export const TREE_SIZE = BUILD_TILE_SIZE;

/** One global cell, independent of visual scale and rotation. */
export function treeFootprint(x: number, z: number) {
  const tx=Math.floor((x+WORLD.half)/BUILD_TILE_SIZE),tz=Math.floor((z+WORLD.half)/BUILD_TILE_SIZE);
  return {x:(tx+0.5)*BUILD_TILE_SIZE-WORLD.half,z:(tz+0.5)*BUILD_TILE_SIZE-WORLD.half,
    key:`${tx},${tz}`,cells:[`${tx},${tz}`]};
}

export class TreeOccupancy {
  private cells = new Set<string>();
  clear() { this.cells.clear(); }
  canPlace(x: number, z: number): boolean {
    const footprint = treeFootprint(x, z);
    return Number.isFinite(x) && Number.isFinite(z) &&
      Math.abs(footprint.x) + TREE_SIZE / 2 <= WORLD.half &&
      Math.abs(footprint.z) + TREE_SIZE / 2 <= WORLD.half &&
      footprint.cells.every(cell => !this.cells.has(cell));
  }
  reserve(x: number, z: number): boolean {
    if (!this.canPlace(x, z)) return false;
    for (const cell of treeFootprint(x, z).cells) this.cells.add(cell);
    return true;
  }
  release(x: number, z: number) {
    for (const cell of treeFootprint(x, z).cells) this.cells.delete(cell);
  }
}

export function normalizeTreeProps<T extends { kind: string; x: number; z: number }>(props: T[]): T[] {
  const occupied = new TreeOccupancy();
  return props.flatMap(prop => {
    if (prop.kind !== 'tree') return [prop];
    if (!occupied.reserve(prop.x, prop.z)) return [];
    const { x, z } = treeFootprint(prop.x, prop.z);
    return [{ ...prop, x, z }];
  });
}

export function treeObstacles(props: ReadonlyArray<{ kind: string; x: number; z: number }>) {
  return props.filter(prop => prop.kind === 'tree').map(prop => {
    const { x, z } = treeFootprint(prop.x, prop.z);
    return { x, z, width: TREE_SIZE, depth: TREE_SIZE, height: 0 };
  });
}
