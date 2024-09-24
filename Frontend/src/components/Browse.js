import React from "react";
import image1 from "../assest/image1.jpg";
import { Link } from "react-router-dom";
import image2 from "../assest/image2.jpg";
import image3 from "../assest/image3.jpeg";
import image4 from "../assest/image4.jpg";

const Browse = () => {
  return (
    <div className="bg-gray-50">
      {/* Full-Page Image with Heading and Button */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 shadow-lg">
            Start Predicting Your Crop Yields Today
          </h1>
          <Link
            to="/yield-analysis"
            className="inline-block px-10 py-4 text-lg bg-green-600 hover:bg-green-700 rounded-full text-white font-semibold transition-transform transform hover:scale-105 shadow-md"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* First Text Section */}
      <div className="max-w-5xl mx-auto py-20 px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Empowering Farmers with AgroPredict
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          AgroPredict leverages advanced machine learning algorithms and real-time data to forecast weather conditions, analyze soil health, and offer crop recommendations. We aim to help farmers make informed decisions to maximize their yield potential.
        </p>
      </div>

      {/* Second Image */}
      <div
        className="h-96 bg-cover bg-center mb-20"
        style={{ backgroundImage: `url(${image2})` }}
      ></div>

      {/* Second Text Section */}
      <div className="max-w-5xl mx-auto py-20 px-4 text-center">
  <h2 className="text-4xl font-bold text-gray-800 mb-6">
    Continuous Support for Sustainable Agriculture
  </h2>
  <p className="text-xl text-gray-600 leading-relaxed mb-4">
    Our platform supports farmers by providing insights on soil health, offering personalized crop recommendations, and predicting weather conditions. With our tools, farmers can ensure sustainability and optimize their resources.
  </p>
  <p className="text-xl text-gray-600 leading-relaxed mb-4">
    We analyze soil data to provide tailored suggestions for nutrient management, ensuring that farmers use fertilizers efficiently without harming the environment. Our recommendations take into account the specific needs of different crops, promoting healthier yields and reducing waste.
  </p>
  
</div>


      {/* Third Image */}
      <div
        className="h-96 bg-cover bg-center mb-20"
        style={{ backgroundImage: `url(${image3})` }}
      ></div>

      {/* Third Text Section */}
      <div className="max-w-5xl mx-auto py-20 px-4 text-center">
  <h2 className="text-4xl font-bold text-gray-800 mb-6">
    Data-Driven Insights for Better Crop Decisions
  </h2>
  <p className="text-xl text-gray-600 leading-relaxed mb-4">
    We provide actionable data for farmers to make better decisions about planting, irrigation, and harvesting. Our predictive tools enable farmers to increase efficiency and reduce the risks associated with crop production.
  </p>
  <p className="text-xl text-gray-600 leading-relaxed mb-4">
    Our analytics platform combines historical weather data, soil conditions, and crop performance metrics, giving farmers a comprehensive view of their agricultural landscape. With these insights, farmers can optimize planting schedules to align with favorable weather patterns, ensuring maximum growth potential.
  </p>
  
</div>

      {/* Fourth Image */}
      <div
        className="h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${image4})` }}
      ></div>
    </div>
  );
};

export default Browse;
