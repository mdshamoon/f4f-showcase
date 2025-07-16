'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Plane } from '@react-three/drei';
import * as THREE from 'three';

export default function IncomeStreamsScene() {
  const groupRef = useRef<THREE.Group>(null);
  const chartRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (chartRef.current) {
      chartRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Create animated income chart
  const incomeData = [
    { year: 2024, carbon: 12000, fruits: 6000, color: '#ff6b6b' },
    { year: 2025, carbon: 15000, fruits: 8000, color: '#4ecdc4' },
    { year: 2026, carbon: 18000, fruits: 10000, color: '#45b7d1' },
    { year: 2027, carbon: 22000, fruits: 12000, color: '#96ceb4' },
    { year: 2028, carbon: 25000, fruits: 15000, color: '#feca57' },
  ];

  return (
    <group ref={groupRef}>
      {/* Income chart */}
      <group ref={chartRef} position={[0, 0, 0]}>
        {incomeData.map((data, index) => {
          const carbonHeight = data.carbon / 2500; // Scale for visualization
          const fruitHeight = data.fruits / 2500;
          
          return (
            <group key={index} position={[-4 + index * 2, 0, 0]}>
              {/* Carbon credit bar */}
              <Box 
                args={[0.4, carbonHeight, 0.4]} 
                position={[0, carbonHeight / 2, 0.5]}
              >
                <meshStandardMaterial color="#4CAF50" />
              </Box>
              
              {/* Fruit income bar */}
              <Box 
                args={[0.4, fruitHeight, 0.4]} 
                position={[0, fruitHeight / 2, -0.5]}
              >
                <meshStandardMaterial color="#FF9800" />
              </Box>
              
              {/* Year label */}
              <Text
                position={[0, -1, 0]}
                fontSize={0.2}
                color="#ffffff"
                anchorX="center"
              >
                {data.year}
              </Text>
              
              {/* Income values */}
              <Text
                position={[0, carbonHeight + 0.5, 0.5]}
                fontSize={0.15}
                color="#4CAF50"
                anchorX="center"
              >
                ₹{(data.carbon / 1000).toFixed(0)}k
              </Text>
              
              <Text
                position={[0, fruitHeight + 0.5, -0.5]}
                fontSize={0.15}
                color="#FF9800"
                anchorX="center"
              >
                ₹{(data.fruits / 1000).toFixed(0)}k
              </Text>
            </group>
          );
        })}
      </group>

      {/* Carbon credit visualization */}
      <group position={[-6, 2, 3]}>
        <Sphere args={[0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#4CAF50" transparent opacity={0.7} />
        </Sphere>
        <Text
          position={[0, 0, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          CO₂
        </Text>
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.2}
          color="#4CAF50"
          anchorX="center"
        >
          Carbon Credits
        </Text>
      </group>

      {/* Fruit trees visualization */}
      <group position={[6, 0, 3]}>
        {/* Tree trunk */}
        <Box args={[0.2, 2, 0.2]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Box>
        
        {/* Tree crown */}
        <Sphere args={[1]} position={[0, 2.5, 0]}>
          <meshStandardMaterial color="#228B22" />
        </Sphere>
        
        {/* Fruits */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 0.8;
          return (
            <Sphere 
              key={i}
              args={[0.1]} 
              position={[
                Math.cos(angle) * radius,
                2.5 + Math.sin(i) * 0.2,
                Math.sin(angle) * radius
              ]}
            >
              <meshStandardMaterial color="#FF6347" />
            </Sphere>
          );
        })}
        
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.2}
          color="#FF9800"
          anchorX="center"
        >
          Fruit Income
        </Text>
      </group>

      {/* Market price indicators */}
      <group position={[0, -6, -3]}>
        <Plane args={[4, 2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" transparent opacity={0.8} />
        </Plane>
        
        <Text
          position={[0, 0.5, 0.1]}
          fontSize={0.25}
          color="#4CAF50"
          anchorX="center"
        >
          Carbon: ₹1,200/ton
        </Text>
        
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.25}
          color="#FF9800"
          anchorX="center"
        >
          Fruits: ₹80/kg
        </Text>
        
        <Text
          position={[0, -0.5, 0.1]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
        >
          Market Prices
        </Text>
      </group>

      {/* Legend */}
      <group position={[-8, 0, 0]}>
        <Box args={[0.3, 0.3, 0.3]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#4CAF50" />
        </Box>
        <Text
          position={[0.5, 1, 0]}
          fontSize={0.2}
          color="#4CAF50"
          anchorX="left"
        >
          Carbon Credits
        </Text>
        
        <Box args={[0.3, 0.3, 0.3]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#FF9800" />
        </Box>
        <Text
          position={[0.5, 0.5, 0]}
          fontSize={0.2}
          color="#FF9800"
          anchorX="left"
        >
          Fruit Sales
        </Text>
      </group>

      {/* Title */}
      <Text
        position={[0, 6, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Income Streams
      </Text>

      {/* Total income display */}
      <Text
        position={[0, -3, 0]}
        fontSize={0.3}
        color="#44ff44"
        anchorX="center"
        anchorY="middle"
      >
        Total Annual Income: ₹23,000+
      </Text>
    </group>
  );
}
