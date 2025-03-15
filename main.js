import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a cube to the scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Player Controls
const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let velocity = new THREE.Vector3();
const speed = 0.2;

// Event listeners for key presses
document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW': moveForward = true; break;
    case 'KeyS': moveBackward = true; break;
    case 'KeyA': moveLeft = true; break;
    case 'KeyD': moveRight = true; break;
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
  velocity.z = (moveForward ? 1 : 0) - (moveBackward ? 1 : 0);
  velocity.x = (moveRight ? 1 : 0) - (moveLeft ? 1 : 0);

  if (moveForward || moveBackward) {
    controls.moveForward(velocity.z * speed * delta);
  }
  if (moveLeft || moveRight) {
    controls.moveRight(velocity.x * speed * delta);
  }

  renderer.render(scene, camera);
}
animate();
