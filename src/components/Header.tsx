import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Recycle size={32} />
          <span className="text-xl font-bold">E-Waste AI</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-green-200">Home</Link></li>
            <li><Link to="/upload" className="hover:text-green-200">Upload</Link></li>
            <li><Link to="/statistics" className="hover:text-green-200">Statistics</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;