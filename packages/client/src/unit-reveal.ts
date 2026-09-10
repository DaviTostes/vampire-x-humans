import * as THREE from 'three';

/** Máscara circular em uma única chamada instanciada, sem laço de unidades por pixel. */
export class UnitReveal {
  private scene = new THREE.Scene();
  private target = new THREE.WebGLRenderTarget(1, 1, {
    minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter,
  });
  private uniforms = {
    unitRevealMask: { value: this.target.texture },
    unitRevealSize: { value: new THREE.Vector2() },
    unitRevealFar: { value: 600 },
  };
  private materials = new WeakMap<THREE.Material, THREE.Material>();
  private dummy = new THREE.Object3D();
  private clearColor = new THREE.Color();
  private circles: THREE.InstancedMesh;
  private maskMaterial = new THREE.ShaderMaterial({
    uniforms: { unitRevealFar: this.uniforms.unitRevealFar },
    vertexShader: `
      varying vec2 circleUv;
      varying float unitDepth;
      void main() {
        circleUv = uv;
        vec4 viewPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        unitDepth = -viewPosition.z;
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
    fragmentShader: `
      uniform float unitRevealFar;
      varying vec2 circleUv;
      varying float unitDepth;
      void main() {
        float radius = length(circleUv * 2.0 - 1.0);
        if (radius >= 1.0) discard;
        float strength = 1.0 - smoothstep(0.55, 1.0, radius);
        // Profundidade linear em dois canais, para preservar precisão em RGBA8.
        vec2 depth = fract(clamp(unitDepth / unitRevealFar, 0.0, 0.9999) * vec2(1.0, 255.0));
        depth.x -= depth.y / 255.0;
        gl_FragColor = vec4(depth, strength, 1.0);
      }
    `,
    blending: THREE.NoBlending,
    toneMapped: false,
  });

  constructor() {
    this.circles = this.createCircles(16);
  }

  private createCircles(capacity: number) {
    const mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), this.maskMaterial, capacity);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    this.scene.add(mesh);
    return mesh;
  }

  /** Clona materiais compartilhados: os modelos das unidades continuam opacos. */
  apply(object: THREE.Object3D) {
    object.traverse(child => {
      if (!(child instanceof THREE.Mesh)) return;
      const reveal = (source: THREE.Material) => {
        let material = this.materials.get(source);
        if (material) return material;
        material = source.clone();
        material.onBeforeCompile = shader => {
          Object.assign(shader.uniforms, this.uniforms);
          shader.vertexShader = shader.vertexShader
            .replace('#include <common>', '#include <common>\nvarying float revealDepth;')
            .replace('#include <project_vertex>', '#include <project_vertex>\nrevealDepth = -mvPosition.z;');
          shader.fragmentShader = shader.fragmentShader
            .replace('#include <common>', `#include <common>
              uniform sampler2D unitRevealMask;
              uniform vec2 unitRevealSize;
              uniform float unitRevealFar;
              varying float revealDepth;
            `)
            .replace('#include <clipping_planes_fragment>', `#include <clipping_planes_fragment>
              vec4 reveal = texture2D(unitRevealMask, gl_FragCoord.xy / unitRevealSize);
              float depthGap = dot(reveal.rg, vec2(1.0, 1.0 / 255.0)) * unitRevealFar - revealDepth;
              // Recorta apenas a estrutura próxima que está na frente da unidade.
              float strength = reveal.b * step(0.3, depthGap) * (1.0 - smoothstep(14.0, 18.0, depthGap));
              float dither = fract(52.9829189 * fract(dot(floor(gl_FragCoord.xy), vec2(0.06711056, 0.00583715))));
              if (strength > dither) discard;
            `);
        };
        material.customProgramCacheKey = () => 'unit-reveal-v1';
        this.materials.set(source, material);
        this.materials.set(material, material);
        return material;
      };
      child.material = Array.isArray(child.material) ? child.material.map(reveal) : reveal(child.material);
    });
  }

  update(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, units: Map<number, THREE.Group>) {
    renderer.getDrawingBufferSize(this.uniforms.unitRevealSize.value);
    const size = this.uniforms.unitRevealSize.value;
    const width = Math.max(1, Math.ceil(size.x / 2)), height = Math.max(1, Math.ceil(size.y / 2));
    if (width !== this.target.width || height !== this.target.height) this.target.setSize(width, height);
    this.uniforms.unitRevealFar.value = camera.far;
    if (units.size > this.circles.instanceMatrix.count) {
      this.scene.remove(this.circles);
      this.circles.geometry.dispose();
      this.circles.dispose();
      this.circles = this.createCircles(Math.max(units.size, this.circles.instanceMatrix.count * 2));
    }
    camera.updateMatrixWorld(true);
    this.dummy.quaternion.copy(camera.quaternion);
    let count = 0;
    for (const unit of units.values()) {
      // Unidades escondidas pela fog de guerra não devem furar o cenário.
      if (!unit.visible) continue;
      const vampire = unit.userData.kind === 'vampire';
      this.dummy.position.copy(unit.position);
      this.dummy.position.y += vampire ? 1.8 : 1.3;
      this.dummy.scale.setScalar(vampire ? 6.4 : 5.6);
      this.dummy.updateMatrix();
      this.circles.setMatrixAt(count++, this.dummy.matrix);
    }
    this.circles.count = count;
    this.circles.instanceMatrix.needsUpdate = true;
    const previousTarget = renderer.getRenderTarget();
    const alpha = renderer.getClearAlpha();
    renderer.getClearColor(this.clearColor);
    renderer.setRenderTarget(this.target);
    renderer.setClearColor(0x000000, 0);
    renderer.clear();
    renderer.render(this.scene, camera);
    renderer.setRenderTarget(previousTarget);
    renderer.setClearColor(this.clearColor, alpha);
  }
}
