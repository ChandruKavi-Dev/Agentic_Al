import { LoaderCircle } from 'lucide-react';

export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-lg shadow-md border animate-fade-in">
    <LoaderCircle className="w-12 h-12 text-blue-600 animate-spin mb-4" />
    <h3 className="text-lg font-semibold text-gray-700">AI Agents are Analyzing...</h3>
    <p className="text-sm text-gray-500">This may take a moment.</p>
  </div>
);