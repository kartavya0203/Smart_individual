// import Footer from "./Footer";
// import Header from "./Header";

// const About = () => {
//   return (
//     <div>
//       <Header />
//       About
//       <Footer />
//     </div>
//   );
// };

// export default About;

import Footer from "./Footer";
import Header from "./Header";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            AgroPredict is a cutting-edge agricultural technology company dedicated to empowering farmers with data-driven insights and innovative solutions. Our mission is to enhance crop yields, optimize resource utilization, and create sustainable farming practices for a better future.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Founded in 2020, our team of agricultural experts, data scientists, and technology enthusiasts work tirelessly to develop tools that predict weather patterns, analyze soil health, and provide personalized recommendations to farmers across the globe.
          </p>
          <p className="text-lg text-gray-700">
            By leveraging advanced machine learning algorithms and real-time data analysis, we aim to revolutionize the agricultural industry and contribute to global food security. Join us in our journey to cultivate a smarter, more sustainable future for agriculture.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
