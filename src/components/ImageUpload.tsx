import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Loader } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { debounce } from 'lodash';
import { motion } from 'framer-motion';

interface ImageUploadProps {
  setResults: React.Dispatch<React.SetStateAction<any>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setResults }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setApiKeyError('Gemini API key is not set. Please check your environment variables.');
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const analyzeImage = async (imageFile: File) => {
    setLoading(true);
    setError(null);
  
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result.split(',')[1]);
          } else {
            reject(new Error('Failed to read image as base64'));
          }
        };
        reader.onerror = error => reject(error);
        reader.readAsDataURL(imageFile);
      });
  
      const imageParts = [
        {
          inlineData: {
            data: base64Image,
            mimeType: imageFile.type
          }
        }
      ];
  
      const result = await model.generateContent([
        "Analyze this e-waste image and provide the following information:\n" +
        "1. Identified components\n" +
        "2. Whether it's recyclable or not\n" +
        "3. Recommendation for disposal or recycling\n" +
        "Format the response as a JSON object with keys: 'categories' (array of objects with 'name' and 'confidence in percentage(number)'), 'recyclable' (boolean), and 'recommendation' (string).",
        ...imageParts
      ]);
  
      const response = await result.response;
      let responseText = await response.text();
  
      console.log("Raw AI response:", responseText);
  
      // Attempt to clean the response text
      responseText = responseText.replace(/```json|```/g, '').trim();
  
      let data;
      try {
        data = JSON.parse(responseText);
  
        if (!data.categories || !Array.isArray(data.categories) || 
            typeof data.recyclable !== 'boolean' || 
            typeof data.recommendation !== 'string') {
          throw new Error('Invalid response structure');
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        data = {
          categories: [],
          recyclable: null,
          recommendation: responseText
        };
      }
  
      const sanitizedData = {
        categories: Array.isArray(data.categories) ? data.categories : [],
        recyclable: typeof data.recyclable === 'boolean' ? data.recyclable : null,
        recommendation: typeof data.recommendation === 'string' ? data.recommendation : 'No recommendation provided.'
      };
  
      setResults(sanitizedData);
      navigate('/results');
    } catch (error) {
      console.error('Error analyzing image:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const debouncedAnalyzeImage = useMemo(
    () => debounce(analyzeImage, 1000),
    [navigate, setResults]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
    debouncedAnalyzeImage(image);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto relative"
    >
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg"
        >
          <div className="text-white text-center">
            <Loader className="animate-spin mx-auto mb-4" size={48} />
            <p>Analyzing image...</p>
          </div>
        </motion.div>
      )}
      <h2 className="text-2xl font-bold mb-4">Upload E-waste Image</h2>
      {apiKeyError && <p className="text-red-500 mb-4">{apiKeyError}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          {preview ? (
            <img src={preview} alt="Preview" className="max-w-full h-auto" />
          ) : (
            <div className="text-center">
              <Upload className="mx-auto text-gray-400" size={48} />
              <p className="mt-2 text-sm text-gray-500">Click or drag image to upload</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
        </div>
        <motion.label
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          htmlFor="image-upload"
          className="block w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-center cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Select Image
        </motion.label>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!image || loading}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? (
            <Loader className="animate-spin mx-auto" />
          ) : (
            'Analyze Image'
          )}
        </motion.button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </motion.div>
  );
};

export default ImageUpload;
