import * as THREE from '/lib/three/three.module.js';
import {
  GLTFLoader
} from '/lib/three/plugins/GLTFLoader.js';
import {
  DRACOLoader
} from '/lib/three/plugins/DRACOLoader.js';
import {
  fadeInOutStuff
} from '/index.js';

let scene, camera, renderer, hole;
let scaleSpeedSlow = 1 / 2000;
let scaleSpeed = scaleSpeedSlow;

export function blackhole() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  camera.rotation.x = -Math.PI / 6;
  camera.position.y = 225;
  camera.position.z = 390;
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('canvas-div').appendChild(renderer.domElement);
  /*https://www.youtube.com/watch?v=r4bepZ2PEUw*/
  window.addEventListener('resize', () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
  let loader = new GLTFLoader();
  var dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  loader.setDRACOLoader(dracoLoader);
  loader.load('blackhole/dracoscene.gltf', function (gltf) {
    hole = gltf.scene.children[0];
    hole.position.y = -20;
    hole.scale.set(0, 0, 0);

    let current = {
      x: Number.MIN_VALUE,
      y: Number.MIN_VALUE,
      z: Number.MIN_VALUE
    };
    let target = {
      x: 1,
      y: 1,
      z: 1
    };
    let tween = new TWEEN.Tween(current).to(target, 6000);
    tween.easing(TWEEN.Easing.Exponential.Out)
    tween.onUpdate(function () {
      hole.scale.x = current.x;
      hole.scale.y = current.y;
      hole.scale.z = current.z;
    });

    scene.add(gltf.scene);
    animate();
    fadeInOutStuff();
    setTimeout(function (tween) {
      tween.start();
    }, 1000, tween);
  });
}

function animate() {
  if (hole != null) {
    hole.rotation.z += 0.001;
  }
  renderer.render(scene, camera);
  TWEEN.update();
  requestAnimationFrame(animate);
}