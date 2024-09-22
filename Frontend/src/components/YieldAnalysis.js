import Footer from "./Footer";
import Header from "./Header";

export const YieldAnalysis = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 to-green-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">Yield Analysis</h1>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 ring-1 ring-gray-200">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nitrogen */}
              <div>
                <label htmlFor="nitrogen" className="block text-gray-700 text-sm font-semibold mb-2">
                  Nitrogen (N) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="nitrogen"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                  placeholder="Enter nitrogen level"
                  required
                />
              </div>

              {/* Potassium */}
              <div>
                <label htmlFor="potassium" className="block text-gray-700 text-sm font-semibold mb-2">
                  Potassium (K) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="potassium"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                  placeholder="Enter potassium level"
                  required
                />
              </div>

              {/* Phosphorus */}
              <div>
                <label htmlFor="phosphorus" className="block text-gray-700 text-sm font-semibold mb-2">
                  Phosphorus (P) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="phosphorus"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                  placeholder="Enter phosphorus level"
                  required
                />
              </div>

              {/* Temperature */}
              <div>
                <label htmlFor="temperature" className="block text-gray-700 text-sm font-semibold mb-2">
                  Temperature (°C) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="temperature"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                  placeholder="Enter temperature"
                  required
                />
              </div>

              {/* Humidity */}
              <div>
                <label htmlFor="humidity" className="block text-gray-700 text-sm font-semibold mb-2">
                  Humidity (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="humidity"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                  placeholder="Enter humidity level"
                  required
                />
              </div>

              {/* Rainfall */}
              <div>
                <label htmlFor="rainfall" className="block text-gray-700 text-sm font-semibold mb-2">
                  Rainfall (mm) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="rainfall"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                  placeholder="Enter rainfall amount"
                  required
                />
              </div>

              {/* pH */}
              <div>
                <label htmlFor="ph" className="block text-gray-700 text-sm font-semibold mb-2">
                  pH <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="ph"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                  placeholder="Enter pH level"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
            >
              Analyze Yield
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
