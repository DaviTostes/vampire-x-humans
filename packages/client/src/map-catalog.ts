import { MAP_PRESETS, type MapPresetId, type MapPresetConfig } from '@vampire/shared';

export async function loadMapCatalog(): Promise<void> {
  const response = await fetch('/api/maps');
  if (!response.ok) throw new Error('Não foi possível carregar os mapas.');
  const catalog = await response.json() as Record<MapPresetId, MapPresetConfig>;
  for (const id of Object.keys(MAP_PRESETS) as MapPresetId[]) {
    if (id.startsWith('custom-')) delete MAP_PRESETS[id];
  }
  for (const [id, config] of Object.entries(catalog)) {
    if (/^custom-[a-f0-9-]+$/.test(id)) MAP_PRESETS[id as MapPresetId] = config;
  }
}
