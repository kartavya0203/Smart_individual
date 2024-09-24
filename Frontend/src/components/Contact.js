import Footer from "./Footer";
import Header from "./Header";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-green-50 bg-cover bg-center" >
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 mt-20">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Contact Us</h1>
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-10 transform transition-all duration-300 hover:shadow-2xl">
          <form>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-800 text-lg font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-800 text-lg font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-800 text-lg font-semibold mb-2">Message</label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
            <p className="mt-4 text-center text-gray-600" id="success-message" style={{ display: 'none' }}>Your message has been sent successfully!</p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
