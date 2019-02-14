<template>
  <div class="hello">
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
export default {
  name: 'DrawingBoard',
  props: {
    msg: String
  },
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      count: 0,
      mouse: new THREE.Vector3(),
      line: null,
      positions: null,
      geometry: null,
      material: null
    }
  },
  methods: {
    init: function() {

      let container = document.getElementById('container');
      // renderer
      // this.renderer = new THREE.WebGLRenderer();
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      // this.renderer.setSize(window.innerWidth, window.innerHeight);
      // document.body.appendChild(this.renderer.domElement);

      // scene
      this.scene = new THREE.Scene();

      // camera
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
      this.camera.position.set(0, 0, 1000);

      // geometry
      this.geometry = new THREE.BufferGeometry();
      var MAX_POINTS = 500;
      this.positions = new Float32Array(MAX_POINTS * 3);
      this.geometry.addAttribute('position', new THREE.BufferAttribute(this.positions, 3));

      // material
      this.material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 5
      });

      // line
      this.line = new THREE.Line(this.geometry, this.material);
      this.scene.add(this.line);

      document.addEventListener("mousemove", this.onMouseMove, false);
      document.addEventListener('mousedown', this.onMouseDown, false);

    },
    // animate
    animate: function() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);

    },
    // onMouseDown
    onMouseDown: function() {
      // on first click add an extra point
      if( this.count === 0 ){
          this.addPoint();
      }
      this.addPoint();
    },
    // addPoint
    addPoint: function() {
      console.log("point nr " + this.count + ": " + this.mouse.x + " " + this.mouse.y + " " + this.mouse.z);
      this.positions[this.count * 3 + 0] = this.mouse.x;
      this.positions[this.count * 3 + 1] = this.mouse.y;
      this.positions[this.count * 3 + 2] = this.mouse.z;
      this.count++;
      this.line.geometry.setDrawRange(0, this.count);
      this.updateLine();
    },
    // mouse move handler
    onMouseMove: function(event) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.mouse.z = 0;
      this.mouse.unproject(this.camera);
      if( this.count !== 0 ){
        this.updateLine();
      }
    },
    // update line
    updateLine: function() {
      this.positions[this.count * 3 - 3] = this.mouse.x;
      this.positions[this.count * 3 - 2] = this.mouse.y;
      this.positions[this.count * 3 - 1] = this.mouse.z;
      this.line.geometry.attributes.position.needsUpdate = true;
    }

  },
  mounted() {
      this.init();
      this.animate();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas { width: 100%; height: 100% }
#container {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
