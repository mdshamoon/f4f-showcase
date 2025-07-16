'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function DroneMonitoringScene() {
  const groupRef = useRef<THREE.Group>(null);
  const droneRef = useRef<THREE.Group>(null);
  const [flightPhase, setFlightPhase] = useState(0);

  // Flight path points
  const flightPath = [
    new THREE.Vector3(-4, 3, -4),
    new THREE.Vector3(0, 3, -4),
    new THREE.Vector3(4, 3, -4),
    new THREE.Vector3(4, 3, 0),
    new THREE.Vector3(4, 3, 4),
    new THREE.Vector3(0, 3, 4),
    new THREE.Vector3(-4, 3, 4),
    new THREE.Vector3(-4, 3, 0),
  ];

  useFrame((state) => {
    if (droneRef.current) {
      const elapsed = state.clock.elapsedTime;
      const pathIndex = Math.floor(elapsed / 2) % flightPath.length;
      const nextIndex = (pathIndex + 1) % flightPath.length;
      const progress = (elapsed / 2) % 1;
      
      const currentPos = flightPath[pathIndex];
      const nextPos = flightPath[nextIndex];
      
      // Interpolate position
      droneRef.current.position.lerpVectors(currentPos, nextPos, progress);
      
      // Rotate drone slightly
      droneRef.current.rotation.y = elapsed * 2;
      droneRef.current.rotation.x = Math.sin(elapsed) * 0.1;
      
      setFlightPhase(pathIndex);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Terrain/Field representation */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10, 20, 20]} />
        <meshStandardMaterial 
          color="#8B4513" 
          wireframe={false}
        />
      </mesh>

      {/* Flight path visualization */}
      <Line
        points={[...flightPath, flightPath[0]]}
        color="#00ffff"
        transparent
        opacity={0.6}
        lineWidth={2}
      />

      {/* Waypoint markers */}
      {flightPath.map((point, index) => (
        <group key={index} position={point}>
          <Sphere args={[0.1]}>
            <meshStandardMaterial 
              color={index === flightPhase ? "#ff4444" : "#00ffff"}
              emissive={index === flightPhase ? "#ff4444" : "#00ffff"}
              emissiveIntensity={index === flightPhase ? 0.5 : 0.2}
            />
          </Sphere>
          
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
          >
            WP{index + 1}
          </Text>
        </group>
      ))}

      {/* Drone */}
      <group ref={droneRef}>
        {/* Main body */}
        <Box args={[0.6, 0.2, 0.6]}>
          <meshStandardMaterial color="#333333" />
        </Box>
        
        {/* Propellers */}
        {[
          [-0.4, 0.1, -0.4] as [number, number, number],
          [0.4, 0.1, -0.4] as [number, number, number],
          [0.4, 0.1, 0.4] as [number, number, number],
          [-0.4, 0.1, 0.4] as [number, number, number]
        ].map((pos, index) => (
          <group key={index} position={pos}>
            <Sphere args={[0.15, 8, 8]}>
              <meshStandardMaterial color="#666666" transparent opacity={0.5} />
            </Sphere>
          </group>
        ))}
        
        {/* Camera gimbal */}
        <Sphere args={[0.1]} position={[0, -0.2, 0]}>
          <meshStandardMaterial color="#black" />
        </Sphere>
        
        {/* GPS antenna */}
        <Box args={[0.05, 0.2, 0.05]} position={[0, 0.2, 0]}>
          <meshStandardMaterial color="#red" />
        </Box>
      </group>

      {/* Data collection visualization */}
      <group position={[0, 0, 0]}>
        {/* Grid overlay */}
        {Array.from({ length: 5 }, (_, i) =>
          Array.from({ length: 5 }, (_, j) => (
            <group key={`${i}-${j}`} position={[-2 + i, 0, -2 + j]}>
              <Box args={[0.8, 0.02, 0.8]} position={[0, 0.01, 0]}>
                <meshStandardMaterial 
                  color="#00ff00" 
                  transparent 
                  opacity={0.3}
                />
              </Box>
              
              <Text
                position={[0, 0.1, 0]}
                fontSize={0.08}
                color="#00ff00"
                anchorX="center"
              >
                {i + 1}-{j + 1}
              </Text>
            </group>
          ))
        )}
      </group>

      {/* Data collection status */}
      <group position={[6, 2, 0]}>
        <Box args={[2, 1.5, 0.1]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
        
        <Text
          position={[0, 0.5, 0.1]}
          fontSize={0.15}
          color="#00ff00"
          anchorX="center"
        >
          Data Collection Status:
        </Text>
        
        <Text
          position={[0, 0.2, 0.1]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
        >
          Height: 120m AGL
        </Text>
        
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
        >
          Resolution: 2cm/pixel
        </Text>
        
        <Text
          position={[0, -0.2, 0.1]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
        >
          Coverage: {Math.round((flightPhase / flightPath.length) * 100)}%
        </Text>
        
        <Text
          position={[0, -0.4, 0.1]}
          fontSize={0.12}
          color="#44ff44"
          anchorX="center"
        >
          Status: Active
        </Text>
      </group>

      {/* Ground control station */}
      <group position={[-6, 0, 0]}>
        {/* Operator */}
        <Sphere args={[0.3]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#fdbcb4" />
        </Sphere>
        <Box args={[0.6, 1, 0.3]} position={[0, 0.8, 0]}>
          <meshStandardMaterial color="#4a90e2" />
        </Box>
        
        {/* Control tablet */}
        <Box args={[0.3, 0.2, 0.02]} position={[0.4, 1, 0]}>
          <meshStandardMaterial color="#333333" />
        </Box>
        
        {/* Radio antenna */}
        <Box args={[0.05, 1, 0.05]} position={[0, 2, -0.5]}>
          <meshStandardMaterial color="#silver" />
        </Box>
        
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          Ground Control
        </Text>
      </group>

      {/* Communication link */}
      <Line
        points={[
          new THREE.Vector3(-6, 2, 0),
          droneRef.current?.position || new THREE.Vector3(0, 3, 0)
        ]}
        color="#ff00ff"
        transparent
        opacity={0.4}
        lineWidth={1}
      />

      {/* Title */}
      <Text
        position={[0, 5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Drone Monitoring System
      </Text>

      {/* Mission info */}
      <Text
        position={[0, -3, 0]}
        fontSize={0.25}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
        maxWidth={12}
      >
        Annual aerial surveillance capturing ortho images and DEM data
      </Text>

      {/* Mission stats */}
      <group position={[8, 0, 0]}>
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.2}
          color="#00ffff"
          anchorX="center"
        >
          Mission Parameters:
        </Text>
        <Text
          position={[0, 1.1, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
        >
          • Flight Height: 120m
        </Text>
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
        >
          • Ground Resolution: 2cm
        </Text>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
        >
          • Coverage: 2.5 acres
        </Text>
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
        >
          • Frequency: Annual
        </Text>
        <Text
          position={[0, -0.1, 0]}
          fontSize={0.15}
          color="#44ff44"
          anchorX="center"
        >
          • Accuracy: ±5cm
        </Text>
      </group>
    </group>
  );
}
