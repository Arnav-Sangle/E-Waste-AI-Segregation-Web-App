import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Statistics {
  totalAnalyzed: number;
  recyclableItems: number;
  nonRecyclableItems: number;
}

const StatisticsDashboard: React.FC = () => {
  const [stats, setStats] = useState<Statistics>({
    totalAnalyzed: 0,
    recyclableItems: 0,
    nonRecyclableItems: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats({
        totalAnalyzed: 100,
        recyclableItems: 75,
        nonRecyclableItems: 25,
      });
    };

    fetchStats();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white shadow-lg rounded-lg p-6 mt-8"
    >
      <h2 className="text-2xl font-bold mb-4">Recycling Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="text-4xl font-bold text-blue-600">{stats.totalAnalyzed}</p>
          <p className="text-gray-600">Total Items Analyzed</p>
        </motion.div>
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="text-4xl font-bold text-green-600">{stats.recyclableItems}</p>
          <p className="text-gray-600">Recyclable Items</p>
        </motion.div>
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="text-4xl font-bold text-red-600">{stats.nonRecyclableItems}</p>
          <p className="text-gray-600">Non-Recyclable Items</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatisticsDashboard;
