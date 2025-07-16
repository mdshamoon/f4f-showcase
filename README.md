# Farmers for Forest - 3D Visualization Showcase

An innovative Next.js application showcasing the complete Farmers for Forest workflow through interactive 3D visualizations using Three.js.

🌐 **Live Demo**: [View on GitHub Pages](https://[your-username].github.io/showcase)

## 🌟 Features

### 8 Interactive 3D Scenes

1. **Farmer Outreach** - F4F representative connections and scheme introduction
2. **Geocoding** - KML-based geographic coordinate mapping and spatial analysis  
3. **Land Verification** - Google Earth-style satellite analysis for 10-year barren land verification
4. **Token System** - Visual representation of the ₹8000 investment and 4-year return cycle
5. **Resource Provision** - 3D visualization of drip irrigation systems and sapling distribution
6. **Income Streams** - Interactive charts showing carbon credits and fruit harvesting revenue
7. **Drone Monitoring** - Animated flight paths and aerial data collection visualization
8. **ML Tree Detection** - AI-powered tree counting and carbon sequestration analysis

## 🚀 Technology Stack

- **Framework**: Next.js 14 with App Router (Static Export)
- **Language**: TypeScript
- **3D Graphics**: Three.js with React Three Fiber
- **UI Components**: React Three Drei
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🌐 Deployment

This project is configured for automatic deployment to GitHub Pages:

### Automatic Deployment
1. Enable GitHub Pages in your repository (Settings → Pages → Source: GitHub Actions)
2. Push to the main branch - deployment happens automatically via GitHub Actions
3. Your site will be available at: `https://[username].github.io/[repository-name]`

### Manual Build
```bash
npm run build  # Generates static files in 'dist' directory
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📱 Usage

1. Navigate through different process stages using the top navigation bar
2. Interact with 3D scenes using mouse/touch controls:
   - **Rotate**: Left click + drag
   - **Zoom**: Mouse wheel or pinch
   - **Pan**: Right click + drag
3. View detailed process information in the left sidebar
4. Each scene automatically animates to demonstrate the respective process

## 🌱 Farmers for Forest Process Overview

### 1. Land Verification
- Satellite imagery analysis spanning 10 years
- Verification of barren land status
- Environmental impact assessment

### 2. Token Investment System
- Initial farmer investment: ₹8,000
- Annual returns: ₹2,000 for 4 years
- 100% ROI over the investment period

### 3. Resource Provision
- Distribution of drip irrigation materials
- Sapling provision (500+ saplings per plot)
- Species selection for optimal carbon sequestration

### 4. Income Generation
- **Carbon Credits**: ₹15,000/year average
- **Fruit Harvesting**: ₹8,000/year average
- **Total Annual Income**: ₹23,000+

### 5. Precise Geocoding
- KML file creation for boundary mapping
- GPS accuracy within ±1 meter
- Digital elevation model integration

### 6. Drone Monitoring
- Annual aerial surveillance
- High-resolution ortho image capture (2cm/pixel)
- 120m flight height for optimal coverage

### 7. ML Tree Detection
- AWS SageMaker-powered analysis
- 94%+ accuracy in tree identification
- Real-time carbon sequestration calculation

## 📊 Key Metrics

- **Plot Size**: 2.5 acres average
- **Tree Survival Rate**: 95%
- **Carbon Sequestration**: 12.5+ tons/year
- **GPS Accuracy**: ±1 meter
- **Image Resolution**: 2cm/pixel
- **ML Detection Accuracy**: 94%

## 🎯 Project Goals

This visualization aims to:
- Demonstrate the complete F4F workflow in an engaging manner
- Educate stakeholders about sustainable forestry practices
- Showcase the technology integration in modern agriculture
- Highlight the economic and environmental benefits

## 🔧 Development

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📄 License

This project is developed for Farmers for Forest initiative.

---

Built with ❤️ for sustainable forestry and farmer empowerment
