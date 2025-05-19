import React from 'react';
import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Automating E-waste Segregation using AI</h1>
      <p className="text-xl mb-8">
        Our system uses advanced AI to identify and categorize e-waste components,
        helping to streamline the recycling process and reduce environmental impact.
      </p>
      <Link
        to="/upload"
        className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Upload className="mr-2" />
        Start Now
      </Link>
    </div>
  );
};

export default HomePage;