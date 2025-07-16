'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

export default function FarmerOutreachScene() {
  const groupRef = useRef<THREE.Group>(null);
  const phoneRef = useRef<THREE.Group>(null);
  const whatsappRef = useRef<THREE.Group>(null);
  const personRef = useRef<THREE.Group>(null);
  const waveRingsRef = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    // Remove auto-rotation for better readability
    // if (groupRef.current) {
    //   groupRef.current.rotation.y += delta * 0.1;
    // }

    // Animate phone floating
    if (phoneRef.current) {
      phoneRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + 1;
      phoneRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }

    // Animate WhatsApp icon
    if (whatsappRef.current) {
      whatsappRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4 + Math.PI/3) * 0.03 + 0.8;
      // Removed rotation animation for better readability
      // whatsappRef.current.rotation.y += delta * 0.2;
    }

    // Animate person meeting
    if (personRef.current) {
      personRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3 + Math.PI/2) * 0.02 + 0.5;
    }

    // Animate communication waves
    waveRingsRef.current.forEach((ring, i) => {
      if (ring && ring.material && 'opacity' in ring.material) {
        const time = state.clock.elapsedTime + i * 0.5;
        const scale = 1 + Math.sin(time * 0.8) * 0.1;
        ring.scale.setScalar(scale);
        (ring.material as THREE.Material & { opacity: number }).opacity = 0.2 + Math.sin(time * 0.8) * 0.1;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Central F4F Representative with enhanced design */}
      <group position={[0, 0, 0]}>
        {/* Representative figure with better materials */}
        <Sphere args={[0.3, 32, 32]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#4ade80" metalness={0.2} roughness={0.3} />
        </Sphere>
        <Box args={[0.4, 0.8, 0.2]} position={[0, 0.8, 0]}>
          <meshStandardMaterial color="#16a34a" metalness={0.1} roughness={0.4} />
        </Box>
        
        {/* Professional badge */}
        <Ring args={[0.15, 0.2, 16]} position={[0, 1.5, 0.31]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </Ring>
        
        <Text
          position={[0, 2.2, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          F4F Representative
        </Text>
        
        {/* Base platform */}
        <Box args={[1, 0.1, 1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#059669" metalness={0.3} roughness={0.7} />
        </Box>
      </group>

      {/* Phone Call Channel - Enhanced */}
      <group ref={phoneRef} position={[4, 1, 1]}>
        {/* Modern smartphone design */}
        <Box args={[0.25, 0.45, 0.05]}>
          <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
        </Box>
        <Box args={[0.2, 0.35, 0.06]} position={[0, 0, 0.03]}>
          <meshStandardMaterial color="#3b82f6" emissive="#1e40af" emissiveIntensity={0.5} />
        </Box>
        {/* Screen glow effect */}
        <Box args={[0.22, 0.37, 0.07]} position={[0, 0, 0.04]}>
          <meshStandardMaterial color="#60a5fa" transparent opacity={0.3} />
        </Box>
        
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.14}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
        >
          📞 Phone Call
        </Text>
        
        {/* Farmer on phone - enhanced */}
        <group position={[2.5, -0.5, 0]}>
          <Sphere args={[0.25, 32, 32]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#f59e0b" metalness={0.1} roughness={0.8} />
          </Sphere>
          <Box args={[0.35, 0.7, 0.18]} position={[0, -0.1, 0]}>
            <meshStandardMaterial color="#d97706" metalness={0.1} roughness={0.6} />
          </Box>
          
          {/* Farmer's base platform */}
          <Box args={[0.8, 0.05, 0.8]} position={[0, -0.6, 0]}>
            <meshStandardMaterial color="#92400e" metalness={0.2} roughness={0.8} />
          </Box>
          
          <Text
            position={[0, -1, 0]}
            fontSize={0.12}
            color="#d97706"
            anchorX="center"
            anchorY="middle"
          >
            Farmer
          </Text>
        </group>

        {/* Communication signal waves */}
        {[0, 1, 2].map((i) => (
          <Ring
            key={`call-wave-${i}`}
            ref={(el) => { if (el) waveRingsRef.current[i] = el; }}
            args={[0.4 + i * 0.15, 0.5 + i * 0.15, 32]}
            position={[1.2, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.4 - i * 0.1} />
          </Ring>
        ))}
        
        {/* Connection platform */}
        <Box args={[3, 0.08, 1]} position={[1.2, -0.8, 0]}>
          <meshStandardMaterial color="#1e40af" metalness={0.3} roughness={0.7} transparent opacity={0.6} />
        </Box>
      </group>

      {/* WhatsApp Channel - Enhanced */}
      <group ref={whatsappRef} position={[-4, 0.8, 1]}>
        {/* WhatsApp icon with glow */}
        <Sphere args={[0.35, 32, 32]}>
          <meshStandardMaterial color="#25d366" emissive="#128c7e" emissiveIntensity={0.6} metalness={0.3} roughness={0.4} />
        </Sphere>
        <Sphere args={[0.38, 32, 32]}>
          <meshStandardMaterial color="#25d366" transparent opacity={0.2} />
        </Sphere>
        
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.14}
          color="#25d366"
          anchorX="center"
          anchorY="middle"
        >
          💬 WhatsApp
        </Text>

        {/* Farmer with enhanced design */}
        <group position={[-2.5, -0.3, 0]}>
          <Sphere args={[0.25, 32, 32]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#f59e0b" metalness={0.1} roughness={0.8} />
          </Sphere>
          <Box args={[0.35, 0.7, 0.18]} position={[0, -0.1, 0]}>
            <meshStandardMaterial color="#d97706" metalness={0.1} roughness={0.6} />
          </Box>
          
          {/* Smartphone in hand */}
          <Box args={[0.15, 0.25, 0.03]} position={[0.25, 0.1, 0.12]}>
            <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
          </Box>
          <Box args={[0.12, 0.2, 0.04]} position={[0.25, 0.1, 0.14]}>
            <meshStandardMaterial color="#25d366" emissive="#128c7e" emissiveIntensity={0.3} />
          </Box>
          
          {/* Farmer's base platform */}
          <Box args={[0.8, 0.05, 0.8]} position={[0, -0.6, 0]}>
            <meshStandardMaterial color="#92400e" metalness={0.2} roughness={0.8} />
          </Box>
        </group>

        {/* Enhanced message bubbles */}
        {[0, 1, 2].map((i) => (
          <Box
            key={`message-${i}`}
            args={[0.2, 0.1, 0.05]}
            position={[-1.2 + i * 0.4, 0.6 + i * 0.15, 0]}
          >
            <meshStandardMaterial color="#dcf8c6" metalness={0.1} roughness={0.9} />
          </Box>
        ))}
        
        {/* Connection platform */}
        <Box args={[3, 0.08, 1]} position={[-1.2, -0.7, 0]}>
          <meshStandardMaterial color="#128c7e" metalness={0.3} roughness={0.7} transparent opacity={0.6} />
        </Box>
      </group>

      {/* In-Person Meeting Channel - Enhanced */}
      <group ref={personRef} position={[0, 0.5, -4]}>
        {/* F4F Rep with professional appearance */}
        <group position={[-1.2, 0, 0]}>
          <Sphere args={[0.25, 32, 32]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#4ade80" metalness={0.2} roughness={0.3} />
          </Sphere>
          <Box args={[0.35, 0.7, 0.18]} position={[0, -0.1, 0]}>
            <meshStandardMaterial color="#16a34a" metalness={0.1} roughness={0.4} />
          </Box>
          
          {/* Enhanced presentation board */}
          <Box args={[0.6, 0.4, 0.03]} position={[0.4, 0.3, 0]}>
            <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.9} />
          </Box>
          <Box args={[0.58, 0.38, 0.04]} position={[0.4, 0.3, 0.01]}>
            <meshStandardMaterial color="#f3f4f6" />
          </Box>
          
          <Text
            position={[0.4, 0.35, 0.025]}
            fontSize={0.05}
            color="#16a34a"
            anchorX="center"
            anchorY="middle"
          >
            F4F Benefits
          </Text>
          <Text
            position={[0.4, 0.25, 0.025]}
            fontSize={0.03}
            color="#374151"
            anchorX="center"
            anchorY="middle"
          >
            • ₹8000 Investment
          </Text>
          <Text
            position={[0.4, 0.20, 0.025]}
            fontSize={0.03}
            color="#374151"
            anchorX="center"
            anchorY="middle"
          >
            • ₹2000/year Return
          </Text>
          
          {/* Professional base */}
          <Box args={[0.8, 0.05, 0.8]} position={[0, -0.6, 0]}>
            <meshStandardMaterial color="#059669" metalness={0.3} roughness={0.7} />
          </Box>
        </group>

        {/* Farmer with attentive posture */}
        <group position={[1.2, 0, 0]}>
          <Sphere args={[0.25, 32, 32]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#f59e0b" metalness={0.1} roughness={0.8} />
          </Sphere>
          <Box args={[0.35, 0.7, 0.18]} position={[0, -0.1, 0]}>
            <meshStandardMaterial color="#d97706" metalness={0.1} roughness={0.6} />
          </Box>
          
          {/* Farmer's base */}
          <Box args={[0.8, 0.05, 0.8]} position={[0, -0.6, 0]}>
            <meshStandardMaterial color="#92400e" metalness={0.2} roughness={0.8} />
          </Box>
        </group>

        <Text
          position={[0, -1.2, 0]}
          fontSize={0.14}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          🤝 In-Person Meeting
        </Text>

        {/* Trust building visual effect */}
        <Ring
          args={[1.2, 1.4, 32]}
          position={[0, 0.2, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.3} />
        </Ring>
        
        {/* Meeting table/surface */}
        <Box args={[2.8, 0.08, 1.2]} position={[0, -0.8, 0]}>
          <meshStandardMaterial color="#8b5cf6" metalness={0.3} roughness={0.7} transparent opacity={0.6} />
        </Box>
      </group>

      {/* Information Flow Lines */}
      <group>
        {/* Lines connecting channels to center */}
        {[
          { start: [0, 0, 0], end: [2.5, 0.8, 1.8] }, // To phone
          { start: [0, 0, 0], end: [-2.5, 0.6, 1.8] }, // To WhatsApp
          { start: [0, 0, 0], end: [0, 0.3, -2.5] }, // To in-person
        ].map((line, i) => (
          <group key={`line-${i}`}>
            {Array.from({ length: 20 }, (_, j) => {
              const t = j / 19;
              const x = line.start[0] + (line.end[0] - line.start[0]) * t;
              const y = line.start[1] + (line.end[1] - line.start[1]) * t;
              const z = line.start[2] + (line.end[2] - line.start[2]) * t;
              return (
                <Sphere key={j} args={[0.02]} position={[x, y, z]}>
                  <meshBasicMaterial color="#4ade80" transparent opacity={0.6} />
                </Sphere>
              );
            })}
          </group>
        ))}
      </group>

      {/* Scene Title */}
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.3}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
      >
        Farmer Outreach
      </Text>

      <Text
        position={[0, 3, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
      >
        F4F representatives connect with farmers through multiple channels to introduce the forest farming scheme
      </Text>

      {/* Benefits Display */}
      <group position={[4, -1, 0]}>
        <Text
          position={[0, 1, 0]}
          fontSize={0.12}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          Communication Benefits:
        </Text>
        {[
          '📱 Wide Reach via WhatsApp',
          '☎️ Personal Phone Consultations', 
          '🤝 Trust Building In-Person',
          '🌍 Multi-Language Support',
        ].map((benefit, i) => (
          <Text
            key={i}
            position={[0, 0.5 - i * 0.3, 0]}
            fontSize={0.08}
            color="#e5e7eb"
            anchorX="center"
            anchorY="middle"
          >
            {benefit}
          </Text>
        ))}
      </group>

      

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#4ade80" />
    </group>
  );
}
