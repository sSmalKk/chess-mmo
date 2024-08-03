import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { CapsuleCollider, RigidBody, useRapier, Physics } from '@react-three/rapier';

export function Player({ setChunkPosition, initialPosition, speed, direction,
  frontVector, interfaceOpen, setInterfaceOpen, sideVector, rotation, lerp = THREE.MathUtils.lerp, flying }) {
  const [playerPosition, setPlayerPosition] = useState(initialPosition);

  const body = useRef();
  const ref = useRef();
  const rapier = useRapier();
  const [, get] = useKeyboardControls();

  // State for current gravity based on flying and controls
  const [currentGravity, setCurrentGravity] = useState([0, 0, 0]);

  useEffect(() => {
    if (!ref.current) return;
    setPlayerPosition(ref.current.translation());
  }, []);

  useFrame((state) => {
    const { forward, backward, left, right, jump, shift, inventory, escape, layerp, layerm } = get();
    if (!ref.current) return;
    if (inventory) {
      setInterfaceOpen(true);
    }


    const velocity = ref.current.linvel();

    // Update camera position based on player's position
    state.camera.position.set(...ref.current.translation());

    if (body.current && body.current.children[0]) {
      // Example of updating player model rotation based on velocity
      body.current.children[0].rotation.x = lerp(body.current.children[0].rotation.x, Math.sin((velocity.length() > 1) * state.clock.elapsedTime * 10) / 6, 0.1);

      // Copy camera rotation to the player's body
      body.current.rotation.copy(state.camera.rotation);

      // Create a temporary vector to store the world direction
      const worldDirection = new THREE.Vector3();
      state.camera.getWorldDirection(worldDirection);

      // Example of moving the player's body along with the camera
      body.current.position.copy(state.camera.position).add(worldDirection.multiplyScalar(1));
    }

    // Calculate movement direction based on keyboard input
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(state.camera.rotation);

    // Apply movement direction to the player
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

    // Check if player is grounded (example using raycasting)
    const world = rapier.world.raw();
    const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }));
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;

    // Example of jumping if grounded and jump key is pressed
    if (jump && grounded) {
      ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });

    }
    // Update currentGravity based on flying and controls
    if (flying) {
      if (shift) {
        ref.current.setLinvel({ x: 0, y: -7.5, z: 0 });
      } else if (jump) {
        ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });
      } else {
        ref.current.setLinvel({ x: direction.x, y: 0, z: direction.z });
      }
    }
    // Annulling inertia when not flying
    if (!flying && velocity.length() > 0.1) {
      ref.current.setLinvel({ x: 0, y: velocity.y, z: 0 });
    }

    // Example of chunk position update based on player's position
    setChunkPosition([Math.round(state.camera.position.x / 16), 0, Math.round(state.camera.position.z / 16)]);
    setPlayerPosition(state.camera.position);
  });

  return (
    flying ? (
      <Physics gravity={currentGravity}>
        <RigidBody ref={ref} colliders={false} type="dynamic" position={initialPosition} enabledRotations={[false, false, false]}>
          <CapsuleCollider args={[0.75, 1]} position={[0, 1, 0]} />
          <group ref={body}>
            {/* Add your player model or other elements here */}
          </group>
        </RigidBody>
      </Physics>
    ) : (
      <group ref={body}>
        <RigidBody ref={ref} colliders={false} type="dynamic" position={initialPosition} enabledRotations={[false, false, false]}>
          <CapsuleCollider args={[0.75, 1]} position={[0, 1, 0]} />
          <group ref={body}>
            {/* Add your player model or other elements here */}
          </group>
        </RigidBody>
      </group>
    )
  );

}

Player.defaultProps = {
  speed: 5,
  direction: new THREE.Vector3(),
  frontVector: new THREE.Vector3(),
  sideVector: new THREE.Vector3(),
  rotation: new THREE.Euler(),
};
