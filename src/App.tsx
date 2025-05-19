import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ImageUpload from './components/ImageUpload';
import ResultsPage from './components/ResultsPage';
import StatisticsDashboard from './components/StatisticsDashboard';

function App() {
  const [results, setResults] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<ImageUpload setResults={setResults} />} />
            <Route path="/results" element={<ResultsPage results={results} />} />
            <Route path="/statistics" element={<StatisticsDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;