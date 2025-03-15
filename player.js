import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

export function setupPlayerControls(scene, camera) {
  const controls = new PointerLockControls(camera, document.body);
  scene.add(controls.getObject());

  let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
  const speed = 5;

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

  return {
    update(delta) {
      if (moveForward) controls.moveForward(speed * delta);
      if (moveBackward) controls.moveForward(-speed * delta);
      if (moveLeft) controls.moveRight(-speed * delta);
      if (moveRight) controls.moveRight(speed * delta);
    },
  };
}
