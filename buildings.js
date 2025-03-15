import * as THREE from 'three';

// Function to create a single building
export function createBuilding(x, y, z, width, height, depth) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brownish color
    const building = new THREE.Mesh(geometry, material);

    building.position.set(x, y / 2, z); // Center the building vertically
    return building;
}

// Generate multiple buildings
export function generateBuildings(scene) {
    const numBuildings = 20; // Number of buildings to generate
    const gridSize = 100; // Size of the grid

    for (let i = 0; i < numBuildings; i++) {
        const x = Math.random() * gridSize - gridSize / 2; // Random X position
        const z = Math.random() * gridSize - gridSize / 2; // Random Z position
        const width = Math.random() * 10 + 5; // Random width (5–15 units)
        const depth = Math.random() * 10 + 5; // Random depth (5–15 units)
        const height = Math.random() * 50 + 20; // Random height (20–70 units)

        const building = createBuilding(x, height, z, width, height, depth);
        scene.add(building);
    }
}
