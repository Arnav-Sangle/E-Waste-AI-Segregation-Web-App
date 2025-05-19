import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Category {
  name: string;
  confidence: number;
}

interface Results {
  categories: Category[];
  recyclable: boolean;
  recommendation: string;
}

interface ResultsPageProps {
  results: Results | null;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ results }) => {
  if (!results) {
    return <div>No results available. Please upload an image first.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Identified Components:</h3>
          <ul className="space-y-2">
            {results.categories.map((category, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{category.name}</span>
                <span className="text-sm text-gray-600">
                  Confidence: {(category.confidence * 100).toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Recyclability:</h3>
          <div className="flex items-center">
            {results.recyclable ? (
              <>
                <CheckCircle className="text-green-500 mr-2" />
                <span>Recyclable</span>
              </>
            ) : (
              <>
                <XCircle className="text-red-500 mr-2" />
                <span>Not Recyclable</span>
              </>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Recommendation:</h3>
          <div className="flex items-start">
            <AlertTriangle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
            <p>{results.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;