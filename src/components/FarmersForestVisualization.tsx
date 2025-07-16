'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import FarmerOutreachScene from './scenes/FarmerOutreachScene';
import LandVerificationScene from './scenes/LandVerificationScene';
import TokenSystemScene from './scenes/TokenSystemScene';
import ResourcesScene from './scenes/ResourcesScene';
import IncomeStreamsScene from './scenes/IncomeStreamsScene';
import GeocodingScene from './scenes/GeocodingScene';
import DroneMonitoringScene from './scenes/DroneMonitoringScene';
import MLDetectionScene from './scenes/MLDetectionScene';
import ProcessInfo from './ui/ProcessInfo';

const scenes = {
  'farmer-outreach': {
    component: FarmerOutreachScene,
    title: 'Farmer Outreach & Scheme Introduction',
    description: 'F4F representatives connect with farmers through multiple channels to introduce the forest farming scheme',
    color: 'from-teal-500 to-cyan-500',
  },
  'land-verification': {
    component: LandVerificationScene,
    title: 'Land Verification with Google Earth',
    description: 'Verify 10-year barren land status using satellite imagery and historical data',
    color: 'from-blue-500 to-cyan-500',
  },
  'token-system': {
    component: TokenSystemScene,
    title: 'Farmer Token System',
    description: '₹8000 initial investment with ₹2000 annual returns for 4 years',
    color: 'from-yellow-500 to-orange-500',
  },
  'resources': {
    component: ResourcesScene,
    title: 'Resource Provision',
    description: 'Drip irrigation materials and saplings distribution',
    color: 'from-green-500 to-emerald-500',
  },
  'income-streams': {
    component: IncomeStreamsScene,
    title: 'Income Streams',
    description: 'Carbon credits and fruit harvesting revenue visualization',
    color: 'from-purple-500 to-pink-500',
  },
  'geocoding': {
    component: GeocodingScene,
    title: 'KML Geocoding',
    description: 'Precise geographic coordinate mapping and spatial analysis',
    color: 'from-red-500 to-rose-500',
  },
  'drone-monitoring': {
    component: DroneMonitoringScene,
    title: 'Drone Monitoring',
    description: 'Annual aerial surveillance and data collection',
    color: 'from-indigo-500 to-blue-500',
  },
  'ml-detection': {
    component: MLDetectionScene,
    title: 'ML Tree Detection',
    description: 'AI-powered tree counting and carbon sequestration analysis',
    color: 'from-teal-500 to-green-500',
  },
};

export default function FarmersForestVisualization() {
  const [currentScene, setCurrentScene] = useState('farmer-outreach');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSectionChange = (sectionId: string) => {
    if (sectionId === currentScene) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScene(sectionId);
      setIsTransitioning(false);
    }, 300);
  };

  const CurrentSceneComponent = scenes[currentScene as keyof typeof scenes].component;
  const currentSceneData = scenes[currentScene as keyof typeof scenes];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Navigation */}
      <Navigation onSectionChange={handleSectionChange} />

      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentSceneData.color} opacity-10 transition-all duration-1000`} />

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 5, 10], fov: 60 }}
          className="w-full h-full"
        >
          <Environment preset="sunset" />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={2}
            maxDistance={50}
          />
          
          {/* Scene Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          {/* Transition Overlay */}
          <AnimatePresence mode="wait">
            {!isTransitioning && (
              <group key={currentScene}>
                <CurrentSceneComponent />
              </group>
            )}
          </AnimatePresence>
        </Canvas>
      </div>

      {/* Process Information Panel */}
      <ProcessInfo
        title={currentSceneData.title}
        description={currentSceneData.description}
        scene={currentScene}
      />

      {/* Loading Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-40"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
              <p className="text-white text-lg font-medium">Transitioning...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
