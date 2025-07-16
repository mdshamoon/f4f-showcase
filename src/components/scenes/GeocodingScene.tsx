'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function GeocodingScene() {
  const groupRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.Group>(null);

  // Generate coordinate points
  const coordinates = useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      x: (Math.random() - 0.5) * 8,
      y: 0,
      z: (Math.random() - 0.5) * 8,
      lat: 12.9716 + (Math.random() - 0.5) * 0.01,
      lng: 77.5946 + (Math.random() - 0.5) * 0.01,
    }));
  }, []);

  const gridLines = useMemo(() => {
    const lines = [];
    // Latitude lines
    for (let i = -4; i <= 4; i++) {
      lines.push([
        new THREE.Vector3(-4, 0, i),
        new THREE.Vector3(4, 0, i)
      ]);
    }
    // Longitude lines
    for (let i = -4; i <= 4; i++) {
      lines.push([
        new THREE.Vector3(i, 0, -4),
        new THREE.Vector3(i, 0, 4)
      ]);
    }
    return lines;
  }, []);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Grid visualization */}
      <group ref={gridRef}>
        {gridLines.map((points, index) => (
          <Line
            key={index}
            points={points}
            color="#00ffff"
            transparent
            opacity={0.3}
            lineWidth={1}
          />
        ))}
      </group>

      {/* Coordinate points */}
      {coordinates.map((coord, index) => (
        <group key={index} position={[coord.x, coord.y, coord.z]}>
          <Sphere args={[0.1]}>
            <meshStandardMaterial 
              color="#ff4444" 
              emissive="#ff4444"
              emissiveIntensity={0.3}
            />
          </Sphere>
          
          {/* Coordinate label */}
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.1}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {coord.lat.toFixed(4)}, {coord.lng.toFixed(4)}
          </Text>
          
          {/* Vertical line to ground */}
          <Line
            points={[
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, -2, 0)
            ]}
            color="#ffff00"
            transparent
            opacity={0.5}
            lineWidth={2}
          />
        </group>
      ))}

      {/* GPS Satellite */}
      <group position={[0, 8, 0]}>
        <Sphere args={[0.3]}>
          <meshStandardMaterial color="#silver" />
        </Sphere>
        
        {/* Signal beams to coordinate points */}
        {coordinates.slice(0, 5).map((coord, index) => (
          <Line
            key={index}
            points={[
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(coord.x, coord.y - 8, coord.z)
            ]}
            color="#00ff00"
            transparent
            opacity={0.3}
            lineWidth={1}
          />
        ))}
        
        <Text
          position={[0, -1, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          GPS Satellite
        </Text>
      </group>

      {/* KML File visualization */}
      <group position={[6, 2, 0]}>
        <mesh>
          <boxGeometry args={[2, 1.5, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        <Text
          position={[0, 0.5, 0.1]}
          fontSize={0.15}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
        >
          {'<?xml version="1.0"?>\n<kml xmlns="...">\n  <Placemark>\n    <Point>\n      <coordinates>\n        77.5946,12.9716\n      </coordinates>\n    </Point>\n  </Placemark>\n</kml>'}
        </Text>
        
        <Text
          position={[0, -1, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          KML File
        </Text>
      </group>

      {/* Field boundaries */}
      <group position={[0, 0.01, 0]}>
        <Line
          points={[
            new THREE.Vector3(-3, 0, -3),
            new THREE.Vector3(3, 0, -3),
            new THREE.Vector3(3, 0, 3),
            new THREE.Vector3(-3, 0, 3),
            new THREE.Vector3(-3, 0, -3)
          ]}
          color="#ffff00"
          lineWidth={3}
        />
        
        <Text
          position={[0, 0, -3.5]}
          fontSize={0.2}
          color="#ffff00"
          anchorX="center"
        >
          Field Boundary
        </Text>
      </group>

      {/* Surveyor with equipment */}
      <group position={[-6, 0, 0]}>
        {/* Person */}
        <Sphere args={[0.3]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#fdbcb4" />
        </Sphere>
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[0.6, 1, 0.3]} />
          <meshStandardMaterial color="#4a90e2" />
        </mesh>
        
        {/* GPS Device */}
        <mesh position={[0.5, 1.2, 0]}>
          <boxGeometry args={[0.2, 0.3, 0.1]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          Field Surveyor
        </Text>
      </group>

      {/* Title */}
      <Text
        position={[0, 5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        KML Geocoding System
      </Text>

      {/* Accuracy indicator */}
      <Text
        position={[0, -4, 0]}
        fontSize={0.25}
        color="#44ff44"
        anchorX="center"
        anchorY="middle"
      >
        GPS Accuracy: ±1 meter
      </Text>

      {/* Coordinate system info */}
      <group position={[-8, 0, 0]}>
        <Text
          position={[0, 1, 0]}
          fontSize={0.2}
          color="#00ffff"
          anchorX="center"
        >
          Coordinate System:
        </Text>
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
        >
          WGS84
        </Text>
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
        >
          UTM Zone 43N
        </Text>
        <Text
          position={[0, 0, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
        >
          EPSG:4326
        </Text>
      </group>
    </group>
  );
}
