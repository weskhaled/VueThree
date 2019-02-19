<template>
  <div class="hello">
    <div id="container" @mousemove="onMouseMove" @mousedown="onClick"></div>
  </div>
</template>

<script>
// var THREE = require("three");
var MeshLine = require("three.meshline");
export default {
  name: "DrawingBoard_1",
  props: {
    msg: String
  },
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      myMesh: null,
      count: 0,
      mouse: new THREE.Vector3(),
      line: null,
      positions: null,
      linePositions: null,
      geometry: null,
      lineGeometry: null,
      material: null,
      lineMaterial: null,
      canvas: new THREE.Mesh(),
      raycaster: null,
      start_point: {
        x: null,
        y: null
      },
      points: [],
      curve: [],
      splineObject: null
    };
  },
  methods: {
    initScene() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xf0f0f0);

      this.camera = new THREE.PerspectiveCamera(
        100,
        window.innerWidth / window.innerHeight,
        1,
        100
      );

      this.camera.position.z = 1;

      this.raycaster = new THREE.Raycaster();

      let container = document.getElementById("container");
      // renderer
      // this.renderer = new THREE.WebGLRenderer();
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      // this.renderer = new THREE.SVGRenderer();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      this.initCanvas();
    },
    /* Initialize the Canvas so we can raycast the mouse click and mouse move */
    initCanvas() {
      let geometry = new THREE.PlaneGeometry(100, 100, 100, 0);
      this.material = new THREE.MeshBasicMaterial({
        visible: false
      });

      this.canvas = new THREE.Mesh(geometry, this.material);
      this.scene.add(this.canvas);

      this.addLineAndMesh();
    },
    addLineAndMesh() {
      // var helper = new THREE.GridHelper(10, 10);
      // helper.rotation.x = Math.PI / 2;
      // this.scene.add(helper);
      // Create a sine-like wave

      this.material = new THREE.LineBasicMaterial({
        color: 0x0000ff,
        linewidth: 1,
        side: THREE.DoubleSide
      });

      var geometry = new THREE.Geometry();
      var v = new THREE.Vector3(0, 0, 0);
      geometry.vertices.push(v);
      var v = new THREE.Vector3(5, 1, 0);
      geometry.vertices.push(v);

      var line = new MeshLine.MeshLine();
      line.setGeometry(geometry);
      line.setGeometry(geometry, function(p) {
        return 2;
      }); // makes width 2 * lineWidth
      var material = new MeshLine.MeshLineMaterial({
        color: 0x00ff00,
        lineWidth: 0.01
      });
      var mesh = new THREE.Mesh(line.geometry, material); // this syntax could definitely be improved!
      this.scene.add(mesh);
    },
    onClick: function(e) {
      let self = this;
      // Create the final object to add to the scene
      this.points.push(new THREE.Vector2(self.mouse.x, self.mouse.y));
      var geometry = new THREE.Geometry();
      geometry.vertices.push(v);
      var v = new THREE.Vector3(this.mouse.x, this.mouse.y, 0);
      if (this.count == 0) {
        this.points.push(new THREE.Vector2(this.mouse.x, this.mouse.y));
        this.points.push(new THREE.Vector2(this.mouse.x, this.mouse.y));
        this.geometry = new THREE.Geometry().setFromPoints(this.points);
        this.splineObject = new THREE.Line(this.geometry, this.material);
        this.scene.add(this.splineObject);

        var v = new THREE.Vector3(this.mouse.x, this.mouse.y, 0);
        geometry.vertices.push(v);

        var line = new MeshLine.MeshLine();
        line.setGeometry(geometry);
        line.setGeometry(geometry, function(p) {
          return 2;
        }); // makes width 2 * lineWidth
        var material = new MeshLine.MeshLineMaterial({
          color: 0x00ff00,
          lineWidth: 0.01
        });
        var mesh = new THREE.Mesh(line.geometry, material); // this syntax could definitely be improved!
        this.scene.add(mesh);
      } else {
        this.splineObject.geometry.setDrawRange(0, this.points.length);

        // var v = new THREE.Vector3(this.mouse.x, this.mouse.y, 0);
        // geometry.vertices.push(v);
        // var mesh = new THREE.Mesh(line.geometry, material); // this syntax could definitely be improved!
        // this.scene.add(mesh);
      }
    },
    onMouseMove(e) {
      let self = this;
      let mouse = {};
      mouse.x = (e.offsetX / this.renderer.domElement.width) * 2 - 1;
      mouse.y = -(e.offsetY / this.renderer.domElement.height) * 2 + 1;
      mouse.z = 0;
      this.raycaster.setFromCamera(mouse, this.camera);

      let intersects = this.raycaster.intersectObjects([this.canvas]);

      if (intersects.length > 0 && intersects[0]) {
        self.mouse = intersects[0].point;
      }
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    // this.init();
    this.initScene();
    this.animate();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
#container {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
