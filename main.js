import * as THREE from 'https://cdn.skypack.dev/three';
import { PointerLockControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/PointerLockControls.js';


//import * as THREE from 'three';
//import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a stationary cube to the scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Player Controls
const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
const speed = 0.2;

// Event listeners for key presses
document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW': moveForward = true; break; // Move forward
    case 'KeyS': moveBackward = true; break; // Move backward
    case 'KeyA': moveLeft = true; break; // Move left
    case 'KeyD': moveRight = true; break; // Move right
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW': moveForward = false; break;
    case 'KeyS': moveBackward = false; break;
    case 'KeyA': moveLeft = false; break;
    case 'KeyD': moveRight = false; break;
  }
});

// Lock pointer on click
document.addEventListener('click', () => {
  controls.lock();
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Update player movement
  const delta = 0.016; // Approximate frame time

  if (moveForward) {
    controls.moveForward(speed * delta); // Move camera forward
  }
  if (moveBackward) {
    controls.moveForward(-speed * delta); // Move camera backward
  }
  if (moveLeft) {
    controls.moveRight(-speed * delta); // Move camera left
  }
  if (moveRight) {
    controls.moveRight(speed * delta); // Move camera right
  }

  renderer.render(scene, camera);
}
animate();
