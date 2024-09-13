// import React from "react";
// import image1 from "../assest/image1.jpg";
// import { Link } from "react-router-dom";
// import image2 from "../assest/image2.jpg";
// import image3 from "../assest/image3.jpeg";
// import image4 from "../assest/image4.jpg";
// const Browse = () => {
//   return (
//     <div>
//       {/* Full-Page Image with Heading and Button */}
//       <div style={{
//         position: "relative",
//         width: "100%",
//         height: "100vh",
//         backgroundImage: `url(${image1})`,  // Correct format for backgroundImage
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",

//       }}>
//         <div style={{
//           position: "absolute",
//           top: "60%",
//           left: "75%",
//           transform: "translate(-50%, -50%)",
//           textAlign: "center",
//           color:"white"
//         }} >
//           <h1 style={{ fontSize: "2.5em", marginBottom: "20px"}} >Get Started Predicting Your Yield</h1>
//           <button style={{
//             padding: "10px 20px",
//             fontSize: "1.2em",
//             backgroundColor: "#331eed",
//             color: "white",
//             border: "none",
//             borderRadius: "40px",
//             cursor: "pointer"
//           }}>
//             <Link to="/some-page" style={{ color: "white", textDecoration: "none" }}>Get Started</Link>
//           </button>
//         </div>
//       </div>

//       {/* First Text Section */}
//       <div style={{ maxWidth: "800px", margin: "20px auto",padding: "20px", textAlign: "center" }}>
//         <h2 style={{ fontSize: "2em", marginBottom: "15px"  }} >AgroPredict</h2>
//         <p style={{ fontSize: "1.2em", lineHeight: "1.6", color: "#555" }}>
//         The project aims to predict whether the weather conditions will enable successful crop yields for farmers. Additionally, it offers insights into the potential for farmers to sell their goods effectively.
//         </p>
//       </div>

//       {/* Second Image */}
//       <div style={{
//         width: "100%",
//         height: "80vh",
//         backgroundImage: `url(${image2})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat"
//       }}>

//       </div>

//       {/* Second Text Section */}
//       <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px", textAlign: "center" }}>
//         <h2 style={{ fontSize: "2em", marginBottom: "15px" }}>Continues Help to the farmers</h2>
//         <p style={{ fontSize: "1.2em", lineHeight: "1.6", color: "#555" }}>

// Helping farmers by analyzing soil health, providing weather forecasts, predicting crop impact, and offering guidance on planting, harvesting, and pest control to improve crop yield and sustainability
//         </p>
//       </div>

//       {/* Third Image */}
//       <div style={{
//         width: "100%",
//         height: "80vh",
//         backgroundImage: `url(${image3})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat"
//       }}>
//       </div>

//       {/* Third Text Section */}
//       <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", textAlign: "center" }}>
//         <h2 style={{ fontSize: "2em", marginBottom: "15px" }}>Farmer can Sell Their product</h2>
//         <p style={{ fontSize: "1.2em", lineHeight: "1.6", color: "#555" }}>

// Farmers can list and sell their crops directly through our platform, allowing customers to purchase fresh, locally-grown produce with ease. Enjoy quality farm-fresh goods delivered straight to your table
//         </p>
//       </div>

//       {/* Fourth Image */}
//       <div style={{
//         width: "100%",
//         height: "80vh",
//         backgroundImage: `url(${image4})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat"
//       }}>
//       </div>

//     </div>
//   );
// };

// export default Browse;

import React from "react";
import image1 from "../assest/image1.jpg";
import { Link } from "react-router-dom";
import image2 from "../assest/image2.jpg";
import image3 from "../assest/image3.jpeg";
import image4 from "../assest/image4.jpg";

const Browse = () => {
  return (
    <div className="bg-gray-100">
      {/* Full-Page Image with Heading and Button */}
      <div
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 shadow-text">
            Get Started Predicting Your Yield
          </h1>
          <Link
            to="/yield-analysis"
            className="inline-block px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* First Text Section */}
      <div className="max-w-4xl mx-auto my-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">AgroPredict</h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          The project aims to predict whether the weather conditions will enable
          successful crop yields for farmers. Additionally, it offers insights
          into the potential for farmers to sell their goods effectively.
        </p>
      </div>

      {/* Second Image */}
      <div
        className="h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image2})` }}
      ></div>

      {/* Second Text Section */}
      <div className="max-w-4xl mx-auto my-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Continuous Help to the Farmers
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Helping farmers by analyzing soil health, providing weather forecasts,
          predicting crop impact, and offering guidance on planting, harvesting,
          and pest control to improve crop yield and sustainability.
        </p>
      </div>

      {/* Third Image */}
      <div
        className="h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image3})` }}
      ></div>

      {/* Third Text Section */}
      <div className="max-w-4xl mx-auto my-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Farmers Can Sell Their Products
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Farmers can list and sell their crops directly through our platform,
          allowing customers to purchase fresh, locally-grown produce with ease.
          Enjoy quality farm-fresh goods delivered straight to your table.
        </p>
      </div>

      {/* Fourth Image */}
      <div
        className="h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image4})` }}
      ></div>
    </div>
  );
};

export default Browse;
