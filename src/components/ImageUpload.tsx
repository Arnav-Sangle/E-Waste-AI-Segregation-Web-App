import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Loader } from 'lucide-react';

interface ImageUploadProps {
  setResults: React.Dispatch<React.SetStateAction<any>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setResults }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('https://api.gemini.ai/v1/analyze-ewaste', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setResults(data);
      navigate('/results');
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload E-waste Image</h2>
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
        <label
          htmlFor="image-upload"
          className="block w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-center cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Select Image
        </label>
        <button
          type="submit"
          disabled={!image || loading}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? (
            <Loader className="animate-spin mx-auto" />
          ) : (
            'Analyze Image'
          )}
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;