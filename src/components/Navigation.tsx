"use client";

import { useState } from "react";
import { Menu, X, Leaf, ChevronLeft, ChevronRight } from "lucide-react";

const navigationItems = [
  { id: "farmer-outreach", label: "Outreach", icon: "🤝" },
  { id: "geocoding", label: "Geocoding", icon: "📍" },
  { id: "land-verification", label: "Land Verify", icon: "🛰️" },

  { id: "token-system", label: "Token System", icon: "💰" },

  { id: "resources", label: "Resources", icon: "🌱" },
  { id: "income-streams", label: "Income", icon: "📈" },
  { id: "drone-monitoring", label: "Drone Monitor", icon: "🚁" },
  { id: "ml-detection", label: "ML Detection", icon: "🤖" },
];

interface NavigationProps {
  onSectionChange?: (sectionId: string) => void;
}

export default function Navigation({ onSectionChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("farmer-outreach");

  const currentIndex = navigationItems.findIndex(
    (item) => item.id === activeSection
  );

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    onSectionChange?.(sectionId);
    setIsMenuOpen(false);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % navigationItems.length;
    handleSectionClick(navigationItems[nextIndex].id);
  };

  const goToPrevious = () => {
    const prevIndex =
      currentIndex === 0 ? navigationItems.length - 1 : currentIndex - 1;
    handleSectionClick(navigationItems[prevIndex].id);
  };

  return (
    <nav className="relative z-50">
      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/20">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 font-bold">
            <Leaf className="w-6 h-6" />
            <span>F4F</span>
          </div>

          {/* Previous arrow */}
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            title="Previous scene"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="flex space-x-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`flex items-center space-x-1 px-2 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-green-500 text-white shadow-md scale-105"
                    : "text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30"
                }`}
                title={item.label}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="hidden xl:inline whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={goToNext}
            className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            title="Next scene"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full p-3 shadow-lg border border-white/20"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40">
          <div className="absolute top-20 right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-white/20 min-w-[280px]">
            <div className="p-4">
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 font-bold mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <Leaf className="w-6 h-6" />
                <span>Farmers for Forest</span>
              </div>
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-green-500 text-white shadow-md"
                        : "text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Navigation Arrows */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-40">
        <button
          onClick={goToPrevious}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full p-3 shadow-lg border border-white/20 hover:scale-110 transition-all duration-200"
          title="Previous scene"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white/20">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentIndex + 1} / {navigationItems.length}
          </span>
        </div>

        <button
          onClick={goToNext}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full p-3 shadow-lg border border-white/20 hover:scale-110 transition-all duration-200"
          title="Next scene"
        >
          <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </nav>
  );
}
