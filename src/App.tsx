import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ImageUpload from './components/ImageUpload';
import ResultsPage from './components/ResultsPage';
import StatisticsDashboard from './components/StatisticsDashboard';

interface AnalysisResults {
  categories: Array<{ name: string; confidence?: number }>;
  recyclable: boolean | null;
  recommendation: string;
}

const App: React.FC = () => {
  const [results, setResults] = useState<AnalysisResults | null>(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/upload" 
              element={<ImageUpload setResults={setResults} />} 
            />
            <Route 
              path="/results" 
              element={
                results ? (
                  <ResultsPage results={results} />
                ) : (
                  <Navigate to="/upload" replace />
                )
              } 
            />
            <Route path="/statistics" element={<StatisticsDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
