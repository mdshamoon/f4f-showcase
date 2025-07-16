'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Plane } from '@react-three/drei';
import * as THREE from 'three';

export default function LandVerificationScene() {
  const groupRef = useRef<THREE.Group>(null);
  const satelliteRef = useRef<THREE.Mesh>(null);
  const earthRef = useRef<THREE.Mesh>(null);

  // Create a grid pattern for the land visualization
  const landTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create a satellite imagery-like pattern
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, 0, 512, 512);
    
    // Add patches of different colors to simulate different land conditions
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#D2B48C' : '#A0522D';
      ctx.fillRect(
        Math.random() * 400,
        Math.random() * 400,
        Math.random() * 100 + 50,
        Math.random() * 100 + 50
      );
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (satelliteRef.current) {
      satelliteRef.current.position.x = Math.sin(state.clock.elapsedTime) * 8;
      satelliteRef.current.position.z = Math.cos(state.clock.elapsedTime) * 8;
      satelliteRef.current.lookAt(0, 0, 0);
    }
    
    if (earthRef.current) {
      earthRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Earth/Land representation */}
      <Sphere ref={earthRef} args={[3, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial map={landTexture} />
      </Sphere>

      {/* Satellite */}
      <group ref={satelliteRef} position={[8, 5, 0]}>
        <Box args={[0.5, 0.3, 0.8]}>
          <meshStandardMaterial color="#silver" />
        </Box>
        {/* Solar panels */}
        <Plane args={[1.5, 0.8]} position={[-0.8, 0, 0]} rotation={[0, Math.PI/2, 0]}>
          <meshStandardMaterial color="#1a1a2e" />
        </Plane>
        <Plane args={[1.5, 0.8]} position={[0.8, 0, 0]} rotation={[0, -Math.PI/2, 0]}>
          <meshStandardMaterial color="#1a1a2e" />
        </Plane>
      </group>

      {/* Scanning beam */}
      <group>
        <mesh position={[0, 0, 0]}>
          <coneGeometry args={[6, 0.1, 32]} />
          <meshBasicMaterial color="#00ff00" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* Information markers */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Google Earth Analysis
      </Text>

      <Text
        position={[0, -4, 0]}
        fontSize={0.3}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
      >
        Verifying 10-year barren land status using satellite imagery
      </Text>

      {/* Timeline title */}
      <Text
        position={[0, -5, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Historical Analysis Timeline
      </Text>

      {/* Timeline indicators */}
      {Array.from({ length: 10 }, (_, i) => (
        <group key={i} position={[-4 + i * 0.8, -6, 0]}>
          <Box args={[0.1, 0.5, 0.1]}>
            <meshStandardMaterial color={i < 7 ? '#ff4444' : '#44ff44'} />
          </Box>
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
          >
            {2015 + i}
          </Text>
        </group>
      ))}

      {/* Timeline legend */}
      <group position={[5, -6, 0]}>
        <Box args={[0.1, 0.3, 0.1]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#ff4444" />
        </Box>
        <Text
          position={[0.3, 0.5, 0]}
          fontSize={0.15}
          color="#ff4444"
          anchorX="left"
        >
          Barren Land
        </Text>
        
        <Box args={[0.1, 0.3, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#44ff44" />
        </Box>
        <Text
          position={[0.3, 0, 0]}
          fontSize={0.15}
          color="#44ff44"
          anchorX="left"
        >
          Vegetation
        </Text>
      </group>
    </group>
  );
}
