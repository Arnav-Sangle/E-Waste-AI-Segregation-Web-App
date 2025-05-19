import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, RecycleIcon, AlertTriangle, ArrowLeft, Package } from 'lucide-react';

interface Category {
  name: string;
  confidence?: number;
}

interface AnalysisResults {
  categories: Category[];
  recyclable: boolean | null;
  recommendation: string | {
    generalAdvice?: string;
    disposalMethods?: string[];
    recyclingCenters?: string[];
    environmentalImpact?: string;
  };
}

interface ResultsPageProps {
  results: AnalysisResults | null;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ results }) => {
  const navigate = useNavigate();

  if (!results) {
    navigate('/');
    return null;
  }
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const renderRecommendation = () => {
    if (typeof results.recommendation === 'string') {
      return (
        <div className="flex items-start">
          <RecycleIcon className="mr-2 mt-1 flex-shrink-0" />
          <p>{results.recommendation}</p>
        </div>
      );
    } else {
      return (
        <>
          {results.recommendation.generalAdvice && (
            <div className="flex items-start mb-4">
              <RecycleIcon className="mr-2 mt-1 flex-shrink-0" />
              <p>{results.recommendation.generalAdvice}</p>
            </div>
          )}
          {results.recommendation.disposalMethods && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <Package className="mr-2" size={18} />
                Disposal Methods:
              </h4>
              <ul className="list-disc pl-8">
                {results.recommendation.disposalMethods.map((method, index) => (
                  <li key={index}>{method}</li>
                ))}
              </ul>
            </div>
          )}
          {results.recommendation.recyclingCenters && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <RecycleIcon className="mr-2" size={18} />
                Nearby Recycling Centers:
              </h4>
              <ul className="list-disc pl-8">
                {results.recommendation.recyclingCenters.map((center, index) => (
                  <li key={index}>{center}</li>
                ))}
              </ul>
            </div>
          )}
          {results.recommendation.environmentalImpact && (
            <div className="flex items-start">
              <AlertTriangle className="mr-2 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Environmental Impact:</h4>
                <p>{results.recommendation.environmentalImpact}</p>
              </div>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg"
    >
      <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 text-center text-gray-800">
        E-waste Analysis Results
      </motion.h2>
      
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Identified Components:</h3>
        {results.categories.length > 0 ? (
          <ul className="space-y-2">
            {results.categories.map((category, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                className="flex items-center bg-gray-100 p-3 rounded-md"
              >
                <span className="flex-grow">{category.name}</span>
                {category.confidence !== undefined && (
                  <span className="text-sm text-gray-600">
                    Confidence: {(category.confidence * 100).toFixed(2)}%
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">No specific components identified.</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Recyclability:</h3>
        <div className={`p-4 rounded-md ${
          results.recyclable === true ? 'bg-green-100' : 
          results.recyclable === false ? 'bg-red-100' : 'bg-yellow-100'
        }`}>
          {results.recyclable === true ? (
            <div className="flex items-center text-green-700">
              <Check className="mr-2" />
              <span>Recyclable</span>
            </div>
          ) : results.recyclable === false ? (
            <div className="flex items-center text-red-700">
              <X className="mr-2" />
              <span>Not Recyclable</span>
            </div>
          ) : (
            <div className="flex items-center text-yellow-700">
              <AlertTriangle className="mr-2" />
              <span>Recyclability Unknown</span>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Recommendation:</h3>
        <div className="bg-blue-100 p-4 rounded-md text-blue-800">
          {renderRecommendation()}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
        >
          <ArrowLeft className="mr-2" size={20} />
          Analyze Another Image
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
export default ResultsPage;
