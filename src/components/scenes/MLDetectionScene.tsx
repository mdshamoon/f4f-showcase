'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Plane } from '@react-three/drei';
import * as THREE from 'three';

export default function MLDetectionScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [scanningProgress, setScanningProgress] = useState(0);
  const [detectedTrees, setDetectedTrees] = useState(0);

  // Generate random tree positions
  const trees = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 8,
        0,
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      size: 0.3 + Math.random() * 0.4,
      detected: false,
      confidence: 0.8 + Math.random() * 0.19,
    }));
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    const progress = (elapsed % 10) / 10; // 10-second cycle
    setScanningProgress(progress);
    
    // Simulate tree detection based on scanning progress
    const detected = Math.floor(progress * trees.length);
    setDetectedTrees(detected);
    
    // Update tree detection status
    trees.forEach((tree, index) => {
      tree.detected = index < detected;
    });
  });

  // Create ortho image texture
  const orthoTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create aerial image-like background
    ctx.fillStyle = '#4a5d3a';
    ctx.fillRect(0, 0, 512, 512);
    
    // Add tree-like spots
    trees.forEach((tree) => {
      const x = (tree.position[0] + 4) / 8 * 512;
      const z = (tree.position[2] + 4) / 8 * 512;
      const radius = tree.size * 20;
      
      ctx.fillStyle = '#2d4a22';
      ctx.beginPath();
      ctx.arc(x, z, radius, 0, Math.PI * 2);
      ctx.fill();
    });
    
    return new THREE.CanvasTexture(canvas);
  }, [trees]);

  return (
    <group ref={groupRef}>
      {/* Ortho image plane */}
      <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <meshStandardMaterial map={orthoTexture} />
      </Plane>

      {/* Trees */}
      {trees.map((tree) => (
        <group key={tree.id} position={tree.position}>
          {/* Tree trunk */}
          <Box args={[0.05, 0.8, 0.05]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#8B4513" />
          </Box>
          
          {/* Tree crown */}
          <Sphere args={[tree.size]} position={[0, 0.8 + tree.size, 0]}>
            <meshStandardMaterial color="#228B22" />
          </Sphere>
          
          {/* Detection indicator */}
          {tree.detected && (
            <group>
              {/* Bounding box */}
              <Box 
                args={[tree.size * 2.2, tree.size * 2.2, tree.size * 2.2]} 
                position={[0, 0.8 + tree.size, 0]}
              >
                <meshBasicMaterial 
                  color="#00ff00" 
                  wireframe 
                  transparent 
                  opacity={0.6}
                />
              </Box>
              
              {/* Confidence label */}
              <Text
                position={[0, 1.5 + tree.size, 0]}
                fontSize={0.1}
                color="#00ff00"
                anchorX="center"
              >
                {(tree.confidence * 100).toFixed(0)}%
              </Text>
            </group>
          )}
        </group>
      ))}

      {/* Scanning overlay */}
      <group position={[0, 2, 0]}>
        <Box args={[10, 0.1, scanningProgress * 10 - 5]} position={[0, 0, (scanningProgress * 10 - 5) / 2]}>
          <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
        </Box>
        
        {/* Scanning line */}
        <Box args={[10, 0.05, 0.1]} position={[0, 0, scanningProgress * 10 - 5]}>
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
        </Box>
      </group>

      {/* ML Processing Unit */}
      <group position={[6, 1, 6]}>
        <Box args={[1.5, 1, 0.8]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
        
        {/* Processing indicators */}
        {Array.from({ length: 4 }, (_, i) => (
          <Box 
            key={i} 
            args={[0.1, 0.1, 0.1]} 
            position={[-0.6 + i * 0.3, 0.6, 0.5]}
          >
            <meshStandardMaterial 
              color="#00ff00" 
              emissive="#00ff00"
              emissiveIntensity={Math.sin(Date.now() * 0.01 + i) > 0 ? 0.5 : 0}
            />
          </Box>
        ))}
        
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          AWS SageMaker
        </Text>
      </group>

      {/* Satellite/Drone data source */}
      <group position={[0, 6, 0]}>
        <Box args={[0.8, 0.3, 1.2]}>
          <meshStandardMaterial color="#333333" />
        </Box>
        
        {/* Data transmission beam */}
        <mesh>
          <coneGeometry args={[4, 0.2, 32]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.2} />
        </mesh>
        
        <Text
          position={[0, 1, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          Ortho Images
        </Text>
      </group>

      {/* Statistics panel */}
      <group position={[-6, 2, 0]}>
        <Box args={[2.5, 2, 0.1]}>
          <meshStandardMaterial color="#1a1a1a" transparent opacity={0.8} />
        </Box>
        
        <Text
          position={[0, 0.8, 0.1]}
          fontSize={0.2}
          color="#00ff00"
          anchorX="center"
        >
          Detection Results:
        </Text>
        
        <Text
          position={[0, 0.5, 0.1]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
        >
          Trees Detected: {detectedTrees}/{trees.length}
        </Text>
        
        <Text
          position={[0, 0.2, 0.1]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
        >
          Accuracy: 94.2%
        </Text>
        
        <Text
          position={[0, -0.1, 0.1]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
        >
          Carbon Est: {(detectedTrees * 0.025).toFixed(1)} tons/year
        </Text>
        
        <Text
          position={[0, -0.4, 0.1]}
          fontSize={0.15}
          color="#44ff44"
          anchorX="center"
        >
          Progress: {(scanningProgress * 100).toFixed(0)}%
        </Text>
        
        <Text
          position={[0, -0.7, 0.1]}
          fontSize={0.12}
          color="#cccccc"
          anchorX="center"
        >
          Processing Time: {(scanningProgress * 10).toFixed(1)}s
        </Text>
      </group>

      {/* Neural network visualization */}
      <group position={[8, 0, 0]}>
        {/* Input layer */}
        {Array.from({ length: 4 }, (_, i) => (
          <Sphere key={`input-${i}`} args={[0.1]} position={[0, i * 0.5 - 0.75, -1]}>
            <meshStandardMaterial color="#4169E1" />
          </Sphere>
        ))}
        
        {/* Hidden layer */}
        {Array.from({ length: 6 }, (_, i) => (
          <Sphere key={`hidden-${i}`} args={[0.1]} position={[0, i * 0.3 - 0.75, 0]}>
            <meshStandardMaterial color="#32CD32" />
          </Sphere>
        ))}
        
        {/* Output layer */}
        {Array.from({ length: 2 }, (_, i) => (
          <Sphere key={`output-${i}`} args={[0.1]} position={[0, i * 0.5 - 0.25, 1]}>
            <meshStandardMaterial color="#FF6347" />
          </Sphere>
        ))}
        
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
        >
          Neural Network
        </Text>
      </group>

      {/* Title */}
      <Text
        position={[0, 8, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        ML Tree Detection System
      </Text>

      {/* Process description */}
      <Text
        position={[0, -4, 0]}
        fontSize={0.25}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
        maxWidth={12}
      >
        AI-powered tree crown detection and carbon sequestration analysis
      </Text>
    </group>
  );
}
