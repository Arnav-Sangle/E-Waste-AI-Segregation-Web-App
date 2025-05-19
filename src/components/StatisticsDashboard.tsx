import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface MaterialData {
  name: string;
  amount: number;
}

interface RecyclabilityData {
  name: string;
  value: number;
}

const StatisticsDashboard: React.FC = () => {
  const [materialData, setMaterialData] = useState<MaterialData[]>([]);
  const [recyclabilityData, setRecyclabilityData] = useState<RecyclabilityData[]>([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.gemini.ai/v1/ewaste-statistics');
        const data = await response.json();
        setMaterialData(data.materialDistribution);
        setRecyclabilityData(data.recyclability);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        // Use mock data if API fails
        setMaterialData([
          { name: 'Plastic', amount: 400 },
          { name: 'Metal', amount: 300 },
          { name: 'Glass', amount: 200 },
          { name: 'Hazardous', amount: 100 },
          { name: 'Other', amount: 150 },
        ]);
        setRecyclabilityData([
          { name: 'Recyclable', value: 70 },
          { name: 'Non-Recyclable', value: 30 },
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">E-waste Statistics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Material Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={materialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Recyclability</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={recyclabilityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {recyclabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        These charts show the distribution of different materials identified in the e-waste items processed by our system and their recyclability.
      </p>
    </div>
  );
};

export default StatisticsDashboard;