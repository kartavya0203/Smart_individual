import Footer from "./Footer";
import Header from "./Header";
import React, { useState } from 'react';
import axios from 'axios';

export const YieldAnalysis = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    potassium: "",
    phosphorus: "",
    temperature: "",
    humidity: "",
    rainfall: "",
    ph: ""
  });
  const [prediction, setPrediction] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateInputs = () => {
    const errorMessages = [];

    // Validate nitrogen, potassium, phosphorus, humidity, temperature, pH
    for (const key of ['nitrogen', 'potassium', 'phosphorus', 'humidity', 'temperature', 'ph']) {
      const value = parseFloat(formData[key]);
      if (value < 0) {
        errorMessages.push(`${key.charAt(0).toUpperCase() + key.slice(1)} cannot be negative.`);
      } else if (value > 999) {
        errorMessages.push(`${key.charAt(0).toUpperCase() + key.slice(1)} should not exceed 999.`);
      }
    }

    // Validate rainfall (must be a three-digit number between 0 and 999)
    const rainfall = parseFloat(formData.rainfall);
    if (isNaN(rainfall) || rainfall < 0 || rainfall > 999) {
      errorMessages.push("Rainfall must be a three-digit number (0-999).");
    }

    // Set errors
    setErrors(errorMessages);
    return errorMessages.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors([]);

    // Validate inputs
    if (!validateInputs()) {
      return; // If validation fails, do not proceed with the submission
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/predict/', formData);
      setPrediction(response.data);
    } catch (error) {
      console.error('Error fetching the results', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-100 to-yellow-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 mt-10">
        <h1 className="text-5xl font-bold mb-8 text-center text-green-800">Yield Analysis</h1>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 ring-1 ring-green-200">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nitrogen */}
              <div>
                <label htmlFor="nitrogen" className="block text-black text-sm font-semibold mb-2">
                  Nitrogen (N) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="nitrogen"
                  step="0.001"
                  className="w-full px-4 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                  placeholder="Enter nitrogen level"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Potassium */}
              <div>
                <label htmlFor="potassium" className="block text-black text-sm font-semibold mb-2">
                  Potassium (K) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="potassium"
                  step="0.001"
                  className="w-full px-4 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                  placeholder="Enter potassium level"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Phosphorus */}
              <div>
                <label htmlFor="phosphorus" className="block text-black text-sm font-semibold mb-2">
                  Phosphorus (P) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="phosphorus"
                  step="0.001"
                  className="w-full px-4 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                  placeholder="Enter phosphorus level"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Temperature */}
              <div>
                <label htmlFor="temperature" className="block text-black text-sm font-semibold mb-2">
                  Temperature (°C) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.00001"
                  id="temperature"
                  className="w-full px-4 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                  placeholder="Enter temperature"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Humidity */}
              <div>
                <label htmlFor="humidity" className="block text-black text-sm font-semibold mb-2">
                  Humidity (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.00001"
                  id="humidity"
                  className="w-full px-4 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                  placeholder="Enter humidity level"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Rainfall */}
              <div>
                <label htmlFor="rainfall" className="block text-black text-sm font-semibold mb-2">
                  Rainfall (mm) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.00001"
                  id="rainfall"
                  className="w-full px-4 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                  placeholder="Enter rainfall amount"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* pH */}
              <div>
                <label htmlFor="ph" className="block text-black text-sm font-semibold mb-2">
                  pH <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.00001"
                  id="ph"
                  className="w-full px-4 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                  placeholder="Enter pH level"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
            >
              Analyze Yield
            </button>
          </form>

          {/* Display errors */}
          {errors.length > 0 && (
            <div className="mt-4 bg-red-200 text-red-800 p-4 rounded">
              <h3 className="font-bold">Validation Errors:</h3>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Display prediction result */}
          {prediction && (
            <div className="mt-12 bg-gradient-to-r from-teal-500 to-green-600 p-8 rounded-lg shadow-lg text-white">
              <h2 className="text-4xl font-bold mb-4">Yield Prediction</h2>
              <p className="text-lg">Based on the provided inputs, the expected yield is:</p>
              <div className="mt-6">
                <p className="text-3xl font-semibold">
                  Crop: <span className="text-yellow-300">{prediction.predicted_crop}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
