import { motion } from 'framer-motion';

interface ProcessInfoProps {
  title: string;
  description: string;
  scene: string;
}

const processDetails = {
  'farmer-outreach': {
    steps: [
      'Identify target farming communities',
      'Multi-channel communication approach',
      'Scheme benefits presentation',
      'Trust building and relationship establishment',
      'Initial interest and eligibility assessment',
    ],
    metrics: ['Channels: WhatsApp, Phone, In-person', 'Reach: 1000+ farmers/month', 'Conversion: 15-20%'],
  },
  'land-verification': {
    steps: [
      'Satellite imagery analysis for 10-year period',
      'Land barrenness verification',
      'Soil quality assessment',
      'Environmental impact evaluation',
    ],
    metrics: ['Area: 2.5 acres', 'Barren period: 10+ years', 'Soil pH: 6.5-7.2'],
  },
  'token-system': {
    steps: [
      'Initial token payment: ₹8,000',
      'Annual return: ₹2,000',
      'Total return period: 4 years',
      'ROI: 100% over 4 years',
    ],
    metrics: ['Investment: ₹8,000', 'Annual return: ₹2,000', 'Total return: ₹8,000'],
  },
  'resources': {
    steps: [
      'Drip irrigation system setup',
      'Sapling distribution and planting',
      'Species selection for carbon efficiency',
      'Initial care and maintenance',
    ],
    metrics: ['500+ saplings', '200m drip line', '95% survival rate'],
  },
  'income-streams': {
    steps: [
      'Carbon credit generation',
      'Fruit and crop harvesting',
      'Market price optimization',
      'Sustainable income planning',
    ],
    metrics: ['₹15,000/year carbon credits', '₹8,000/year fruits', '₹23,000 total/year'],
  },
  'geocoding': {
    steps: [
      'GPS coordinate collection',
      'KML file generation',
      'Boundary marking',
      'Digital mapping integration',
    ],
    metrics: ['Accuracy: ±1m', 'Plot area: 2.5 acres', 'Coordinates: 12°N, 77°E'],
  },
  'drone-monitoring': {
    steps: [
      'Annual flight scheduling',
      'High-resolution imagery capture',
      'Ortho image processing',
      'Digital elevation modeling',
    ],
    metrics: ['Flight height: 120m', 'Resolution: 2cm/pixel', 'Coverage: 100%'],
  },
  'ml-detection': {
    steps: [
      'Image preprocessing with ML',
      'Tree crown detection',
      'Carbon sequestration calculation',
      'Growth monitoring analysis',
    ],
    metrics: ['Trees detected: 485', 'Carbon: 12.5 tons/year', 'Accuracy: 94%'],
  },
};

export default function ProcessInfo({ title, description, scene }: ProcessInfoProps) {
  const details = processDetails[scene as keyof typeof processDetails];

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 max-w-sm z-30"
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {description}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Process Steps
          </h4>
          <ul className="space-y-1">
            {details?.steps.map((step, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <span className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-1.5"></span>
                <span>{step}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Key Metrics
          </h4>
          <div className="space-y-1">
            {details?.metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs px-3 py-1 rounded-full font-medium"
              >
                {metric}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
