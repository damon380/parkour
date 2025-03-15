//import * as THREE from 'https://cdn.jsdelivr.net/npm/three/build/three.module.js';
//import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/controls/PointerLockControls.js';


import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { generateBuildings } from './buildings.js';
import { setupPlayerControls } from './player.js';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Generate Buildings
generateBuildings(scene);

// Set up Player Controls
const playerControls = setupPlayerControls(scene, camera);

// Camera Position
camera.position.set(0, 10, 50); // Start above the ground

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Update player controls
  playerControls.update(0.016); // Approximate frame time

  renderer.render(scene, camera);
}
animate();
