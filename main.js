import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./style.css";

const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// responsive sizing

function onWindowResize() {

  SCREEN_HEIGHT = window.innerHeight;
  SCREEN_WIDTH = window.innerWidth;

  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();

  renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
  composer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

}
window.addEventListener( 'resize', onWindowResize );

// loader
const loader = new GLTFLoader();
let gltfObject = null;

loader.load(
  "/a_windy_day.glb",
  function (gltf) {
    gltfObject = gltf.scene;
    gltfObject.rotation.x = Math.PI / 2;
    gltfObject.rotation.z = Math.PI / 2;
    scene.add(gltfObject);

    function animate() {
      requestAnimationFrame(animate);
      gltfObject.rotation.z -= 0.03;
      renderer.render(scene, camera);
    }
    animate();
  },
  undefined,
  function (error) {
    console.log(error);
  }
);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1);
scene.add(light);

// add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.screenSpacePanning = false;
controls.minDistance = 0.1;
controls.maxDistance = 10;

// animate function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
