export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-900 to-blue-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mb-6"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-500 rounded-full animate-spin-slow"></div>
        </div>
        <h2 className="text-white text-xl font-semibold mb-2">
          Loading Farmers for Forest
        </h2>
        <p className="text-green-200 text-sm">
          Preparing your 3D visualization...
        </p>
      </div>
    </div>
  );
}
