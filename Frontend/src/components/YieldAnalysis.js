import Footer from "./Footer";
import Header from "./Header";
import React,{useState} from 'react';
import axios from 'axios';

export const YieldAnalysis = () => {
  const [formData,setformData]=useState({
    nitrogen:"",
    potassium:"",
    phosphorus:"",
    temperature:"",
    humidity:"",
    rainfall:"",
    ph:""

  });
  const [prediction,setPrediction]=useState(null)

  const handleInputChange=(e)=>{
       setformData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>{
       e.preventDefault();
       try{
        const response = await axios.post('http://127.0.0.1:8000/api/v1/predict/',formData);
        setPrediction(response.data);
       }
       catch(error){
        console.error('Error fetching the results',error)

       }
  }
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
              step="0.1"
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
              step="0.1"
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
              step="0.1"
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
              step="0.1"
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

      {/* Display prediction result */}
      {prediction && (
            <div className="mt-12 bg-gradient-to-r from-teal-500 to-green-600 p-8 rounded-lg shadow-lg text-white">
              <h2 className="text-4xl font-bold mb-4">Yield Prediction</h2>
              <p className="text-lg">Based on the provided inputs, the expected yield is:</p>
              <div className="mt-6">
                <p className="text-3xl font-semibold">
                  Crop: <span className="text-yellow-300">{prediction.predicted_crop}</span>
                </p>
                {/* <p className="text-3xl font-semibold">
                  Predicted Yield: <span className="text-yellow-300">{prediction.yield} kg/acre</span>
                </p> */}
              </div>
            </div>
          )}

    </div>
  </main>
  <Footer />
</div>

  );
};
