import Footer from "./Footer";
import Header from "./Header";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 mt-20">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-700">About Us</h1>
        <div className="max-w-3xl mx-auto mb-12 bg-white shadow-lg rounded-lg p-8">
          <p className="text-lg text-gray-700 mb-6">
            AgroPredict is a cutting-edge agricultural technology company dedicated to empowering farmers with data-driven insights and innovative solutions. Our mission is to enhance crop yields, optimize resource utilization, and create sustainable farming practices for a better future.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Founded in 2020, our team of agricultural experts, data scientists, and technology enthusiasts work tirelessly to develop tools that predict weather patterns, analyze soil health, and provide personalized recommendations to farmers across the globe.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            By leveraging advanced machine learning algorithms and real-time data analysis, we aim to revolutionize the agricultural industry and contribute to global food security. Join us in our journey to cultivate a smarter, more sustainable future for agriculture.
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-3xl mx-auto mb-12 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            To provide farmers with the tools and insights they need to increase productivity and sustainability through data-driven decision-making.
          </p>
        </div>

        {/* Values Section */}
        <div className="max-w-3xl mx-auto mb-12 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Values</h2>
          <ul className="list-disc pl-5 text-lg text-gray-700">
            <li>Innovation: Continuously improving our technology and services.</li>
            <li>Sustainability: Promoting eco-friendly practices in agriculture.</li>
            <li>Community: Supporting farmers and rural communities worldwide.</li>
            <li>Integrity: Upholding the highest standards of ethics and transparency.</li>
          </ul>
        </div>

        {/* Team Section */}
        <div className="max-w-3xl mx-auto mb-12 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-700">
            Our diverse team brings together expertise from agriculture, data science, and technology to create solutions that meet the needs of today’s farmers. We believe in collaboration and are committed to making a positive impact in the agricultural sector.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
