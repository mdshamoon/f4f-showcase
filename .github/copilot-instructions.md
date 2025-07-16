# Copilot Instructions for Farmers for Forest Showcase

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Next.js application with Three.js for visualizing Farmers for Forest processes in an innovative 3D environment.

## Project Context
- **Purpose**: Showcase the complete Farmers for Forest workflow through interactive 3D visualizations
- **Technology Stack**: Next.js 14, TypeScript, Three.js, React Three Fiber, Tailwind CSS
- **Target Audience**: Farmers, stakeholders, and potential partners

## Key Features to Implement
1. **Land Verification Scene**: 3D satellite view with Google Earth-style interface
2. **Token Management**: Visual representation of the ₹8000 token system
3. **Resource Provision**: 3D models of drip irrigation and saplings
4. **Income Visualization**: Interactive charts for carbon credits and fruit income
5. **KML Geocoding**: 3D map with coordinate plotting
6. **Drone Monitoring**: Animated flight paths and data collection
7. **ML Tree Detection**: Real-time tree counting visualization

## Code Guidelines
- Use TypeScript for type safety
- Implement responsive design with Tailwind CSS
- Create reusable Three.js components using React Three Fiber
- Follow Next.js App Router conventions
- Use Framer Motion for smooth transitions
- Implement proper error boundaries and loading states

## Performance Considerations
- Optimize Three.js scenes for mobile devices
- Use dynamic imports for heavy 3D components
- Implement proper asset loading and caching
- Consider WebGL performance limits

## Accessibility
- Ensure keyboard navigation for 3D scenes
- Provide text alternatives for visual elements
- Use proper semantic HTML structure
- Implement ARIA labels where needed
