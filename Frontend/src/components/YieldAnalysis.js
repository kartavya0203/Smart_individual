// import Footer from "./Footer";
// import Header from "./Header";

// export const YieldAnalysis = () => {
//   return (
//     <div>
//       <Header />
//       YieldAnalysis
//       <Footer />
//     </div>
//   );
// };

import Footer from "./Footer";
import Header from "./Header";

export const YieldAnalysis = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Yield Analysis</h1>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="crop" className="block text-gray-700 text-sm font-bold mb-2">Crop Type</label>
                <select id="crop" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                  <option>Select a crop</option>
                  <option>Wheat</option>
                  <option>Corn</option>
                  <option>Soybeans</option>
                </select>
              </div>
              <div>
                <label htmlFor="area" className="block text-gray-700 text-sm font-bold mb-2">Field Area (acres)</label>
                <input type="number" id="area" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="soil" className="block text-gray-700 text-sm font-bold mb-2">Soil Type</label>
                <select id="soil" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                  <option>Select soil type</option>
                  <option>Clay</option>
                  <option>Sandy</option>
                  <option>Loam</option>
                </select>
              </div>
              <div>
                <label htmlFor="irrigation" className="block text-gray-700 text-sm font-bold mb-2">Irrigation Method</label>
                <select id="irrigation" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                  <option>Select irrigation method</option>
                  <option>Drip</option>
                  <option>Sprinkler</option>
                  <option>Flood</option>
                </select>
              </div>
            </div>
            <button type="submit" className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
              Analyze Yield
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};