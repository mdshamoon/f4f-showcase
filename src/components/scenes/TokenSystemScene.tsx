'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function TokenSystemScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  
  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    const phase = Math.floor(elapsed / 3) % 5; // 5 phases, 3 seconds each
    setAnimationPhase(phase);
  });

  const tokenPositions = [
    { x: -6, y: 2, z: 0, label: 'Initial Investment', amount: '₹8000', color: '#ff6b6b' },
    { x: -2, y: 2, z: 0, label: 'Year 1 Return', amount: '₹2000', color: '#4ecdc4' },
    { x: 2, y: 2, z: 0, label: 'Year 2 Return', amount: '₹2000', color: '#4ecdc4' },
    { x: 6, y: 2, z: 0, label: 'Year 3 Return', amount: '₹2000', color: '#4ecdc4' },
    { x: 0, y: -2, z: 0, label: 'Year 4 Return', amount: '₹2000', color: '#4ecdc4' },
  ];

  return (
    <group ref={groupRef}>
      {/* Central farmer representation */}
      <group position={[0, 0, 0]}>
        <Sphere args={[0.5, 16, 16]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#fdbcb4" />
        </Sphere>
        <Box args={[0.8, 1.5, 0.4]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#4a90e2" />
        </Box>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
        >
          Farmer
        </Text>
      </group>

      {/* Token visualization */}
      {tokenPositions.map((token, index) => {
        const isActive = animationPhase >= index;
        const scale = isActive ? 1 : 0.3;
        const opacity = isActive ? 1 : 0.5;

        return (
          <group key={index} position={[token.x, token.y, token.z]}>
            {/* Token coin */}
            <Sphere args={[0.8, 16, 16]} scale={[scale, scale, 0.2]}>
              <meshStandardMaterial 
                color={token.color} 
                transparent 
                opacity={opacity}
                emissive={isActive ? token.color : '#000000'}
                emissiveIntensity={isActive ? 0.2 : 0}
              />
            </Sphere>
            
            {/* Amount text */}
            <Text
              position={[0, 0, 0.5]}
              fontSize={0.25}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {token.amount}
            </Text>
            
            {/* Label */}
            <Text
              position={[0, -1.2, 0]}
              fontSize={0.2}
              color="#cccccc"
              anchorX="center"
              anchorY="middle"
              maxWidth={3}
            >
              {token.label}
            </Text>
          </group>
        );
      })}

      {/* Flow arrows */}
      {tokenPositions.slice(0, -1).map((_, index) => {
        const isActive = animationPhase > index;
        const nextToken = tokenPositions[index + 1];
        const currentToken = tokenPositions[index];
        
        const distance = new THREE.Vector3(
          nextToken.x - currentToken.x,
          nextToken.y - currentToken.y,
          nextToken.z - currentToken.z
        ).length();

        return (
          <group 
            key={`arrow-${index}`}
            position={[
              (currentToken.x + nextToken.x) / 2,
              (currentToken.y + nextToken.y) / 2,
              (currentToken.z + nextToken.z) / 2
            ]}
          >
            <Box args={[distance - 2, 0.1, 0.1]}>
              <meshStandardMaterial 
                color={isActive ? '#ffff00' : '#666666'} 
                transparent 
                opacity={isActive ? 0.8 : 0.3}
                emissive={isActive ? '#ffff00' : '#000000'}
                emissiveIntensity={isActive ? 0.3 : 0}
              />
            </Box>
          </group>
        );
      })}

      {/* Title */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Token Investment System
      </Text>

      {/* ROI Summary */}
      <Text
        position={[0, -4, 0]}
        fontSize={0.3}
        color="#44ff44"
        anchorX="center"
        anchorY="middle"
      >
        100% ROI over 4 years
      </Text>

      {/* Phase indicator */}
      <Text
        position={[7, 0, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {animationPhase === 0 && 'Initial Investment'}
        {animationPhase === 1 && 'Year 1 Return'}
        {animationPhase === 2 && 'Year 2 Return'}
        {animationPhase === 3 && 'Year 3 Return'}
        {animationPhase === 4 && 'Year 4 Return'}
      </Text>
    </group>
  );
}
