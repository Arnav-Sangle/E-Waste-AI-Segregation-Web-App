import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const cardColors = [
    'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-red-100',
    'bg-indigo-100', 'bg-purple-100', 'bg-pink-100', 'bg-teal-100', 'bg-orange-100'
  ];

  const eWasteInfo = [
    { title: "Introduction to E-Waste", content: "E-waste, or electronic waste, refers to discarded electrical or electronic devices. As technology rapidly advances, the amount of e-waste generated globally continues to grow, posing significant environmental and health challenges." },
    { title: "Types of E-Waste", content: "E-waste encompasses a wide range of devices, including computers, smartphones, televisions, printers, and household appliances. Each type presents unique recycling challenges and opportunities." },
    { title: "Environmental Impact of E-Waste", content: "Improper disposal of e-waste can lead to soil and water contamination, air pollution, and the release of toxic substances into the environment. Proper recycling can help mitigate these impacts and conserve valuable resources." },
    { title: "Health Impacts of E-Waste", content: "E-waste contains hazardous materials such as lead, mercury, and cadmium. Exposure to these substances can cause serious health issues, including neurological damage, respiratory problems, and increased cancer risk." },
    { title: "E-Waste Management and Recycling", content: "Effective e-waste management involves collection, sorting, dismantling, and recycling. Proper recycling can recover valuable materials like gold, silver, and rare earth elements, reducing the need for new raw material extraction." },
    { title: "Global E-Waste Trade Economy", content: "The global e-waste trade is a complex issue involving the shipment of e-waste from developed to developing countries. This practice often leads to unsafe handling and disposal practices, highlighting the need for international cooperation and regulation." },
    { title: "E-Waste Regulations and Legislation", content: "Many countries have implemented laws and regulations to manage e-waste, such as the WEEE Directive in the EU and various state-level laws in the US. These policies aim to promote responsible disposal and increase recycling rates." },
    { title: "Challenges in E-Waste Recycling", content: "Challenges include the complex composition of electronic devices, rapid technological changes, and the need for specialized recycling facilities. Additionally, consumer awareness and willingness to recycle play crucial roles in effective e-waste management." },
    { title: "Opportunities in E-Waste Industry", content: "The e-waste industry presents opportunities for innovation in recycling technologies, urban mining of valuable materials, and the development of more sustainable electronics. It also offers potential for job creation in the recycling and refurbishment sectors." }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 pb-12"
    >
      <h1 className="text-5xl font-bold mb-6 text-center text-gray-800">E-waste AI Segregation</h1>
      <p className="mb-8 text-xl text-center text-gray-600">
        Upload an image of e-waste to get analysis and recycling recommendations.
      </p>
      <div className="flex justify-center space-x-4 mb-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/upload"
            className="inline-block px-8 py-4 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            Start Analysis
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/statistics"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center"
          >
            <ChartBarIcon className="h-6 w-6 mr-2" />
            View Statistics
          </Link>
        </motion.div>
      </div>

      <div className="mt-16">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Learn About E-Waste</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eWasteInfo.map((section, index) => (
            <motion.div
              key={index}
              className={`${cardColors[index]} rounded-lg shadow-lg p-6 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1`}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{section.title}</h3>
              <p className="text-gray-700">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
