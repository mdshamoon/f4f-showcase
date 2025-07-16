'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Cylinder, Plane } from '@react-three/drei';
import * as THREE from 'three';

export default function ResourcesScene() {
  const groupRef = useRef<THREE.Group>(null);
  const waterDropsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Animate water drops
    if (waterDropsRef.current) {
      waterDropsRef.current.children.forEach((drop, index) => {
        const dropMesh = drop as THREE.Mesh;
        dropMesh.position.y = 2 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.5;
      });
    }
  });

  // Create drip irrigation system
  const createDripSystem = () => {
    const dripLines = [];
    for (let i = 0; i < 5; i++) {
      dripLines.push(
        <group key={i} position={[-4 + i * 2, 0.5, 0]}>
          {/* Main pipe */}
          <Cylinder args={[0.05, 0.05, 8]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#333333" />
          </Cylinder>
          
          {/* Drip emitters */}
          {Array.from({ length: 8 }, (_, j) => (
            <Sphere key={j} args={[0.02]} position={[0, 0, -3.5 + j]}>
              <meshStandardMaterial color="#ff4444" />
            </Sphere>
          ))}
        </group>
      );
    }
    return dripLines;
  };

  // Create sapling representation
  const createSaplings = () => {
    const saplings = [];
    for (let i = 0; i < 25; i++) {
      const x = -4 + (i % 5) * 2;
      const z = -3 + Math.floor(i / 5) * 1.5;
      saplings.push(
        <group key={i} position={[x, -0.5, z]}>
          {/* Trunk */}
          <Cylinder args={[0.05, 0.05, 1]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color="#8B4513" />
          </Cylinder>
          
          {/* Leaves */}
          <Sphere args={[0.3]} position={[0, 1.2, 0]}>
            <meshStandardMaterial color="#228B22" />
          </Sphere>
          
          {/* Small leaves around */}
          <Sphere args={[0.1]} position={[0.2, 1.0, 0.1]}>
            <meshStandardMaterial color="#32CD32" />
          </Sphere>
          <Sphere args={[0.1]} position={[-0.2, 1.1, -0.1]}>
            <meshStandardMaterial color="#32CD32" />
          </Sphere>
        </group>
      );
    }
    return saplings;
  };

  return (
    <group ref={groupRef}>
      {/* Ground plane */}
      <Plane args={[12, 8]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Plane>

      {/* Drip irrigation system */}
      {createDripSystem()}

      {/* Water drops animation */}
      <group ref={waterDropsRef}>
        {Array.from({ length: 20 }, (_, i) => (
          <Sphere 
            key={i} 
            args={[0.03]} 
            position={[-4 + (i % 5) * 2, 2, -3.5 + Math.floor(i / 5) * 2]}
          >
            <meshStandardMaterial color="#4169E1" transparent opacity={0.7} />
          </Sphere>
        ))}
      </group>

      {/* Saplings */}
      {createSaplings()}

      {/* Water tank */}
      <group position={[6, 1, 0]}>
        <Cylinder args={[1, 1, 2]}>
          <meshStandardMaterial color="#4682B4" />
        </Cylinder>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          Water Tank
        </Text>
      </group>

      {/* Resource distribution truck */}
      <group position={[-6, 0, 3]}>
        <Box args={[2, 1, 1]}>
          <meshStandardMaterial color="#FF6347" />
        </Box>
        <Box args={[1, 0.8, 0.8]} position={[1.5, 0, 0]}>
          <meshStandardMaterial color="#FF6347" />
        </Box>
        {/* Wheels */}
        <Cylinder args={[0.3, 0.3, 0.2]} position={[-0.7, -0.7, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#000000" />
        </Cylinder>
        <Cylinder args={[0.3, 0.3, 0.2]} position={[-0.7, -0.7, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#000000" />
        </Cylinder>
        <Cylinder args={[0.3, 0.3, 0.2]} position={[0.7, -0.7, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#000000" />
        </Cylinder>
        <Cylinder args={[0.3, 0.3, 0.2]} position={[0.7, -0.7, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#000000" />
        </Cylinder>
        
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          Resource Delivery
        </Text>
      </group>

      {/* Information display */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Resource Provision System
      </Text>

      <Text
        position={[0, -3, 0]}
        fontSize={0.25}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
      >
        Drip irrigation materials and saplings distributed for efficient afforestation
      </Text>

      {/* Stats panel */}
      <group position={[8, 0, 0]}>
        <Text
          position={[0, 1, 0]}
          fontSize={0.25}
          color="#44ff44"
          anchorX="center"
        >
          Resources Deployed:
        </Text>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          • 500+ Saplings
        </Text>
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          • 200m Drip Lines
        </Text>
        <Text
          position={[0, -0.1, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          • 95% Survival Rate
        </Text>
      </group>
    </group>
  );
}
