// import React from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/cartSlice";

// const ProductCard = ({ productData }) => {
//   const dispatch = useDispatch();

//   const addItem = () => {
//     dispatch(addToCart(productData));
//   };

//   return (
//     <div className="p-4">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 w-[400px]">
//         <img src="" alt="" className="w-full h-48 object-cover" />
//         <div className="p-4 flex flex-col items-center">
//           <h1 className="text-xl font-semibold text-gray-800 mb-2">
//             Product Name
//           </h1>
//           <p className="text-gray-600 mb-2">Product description</p>
//           <p className="text-lg font-bold text-gray-800 mb-4">Product Price</p>
//           <div className="flex gap-x-3">
//             <button
//               className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-colors duration-300"
//               onClick={() => {
//                 console.log("purchase method will come here");
//               }}
//             >
//               Purchase
//             </button>
//             <button
//               onClick={addItem}
//               className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-300"
//             >
//               <p className="mr-2">Add</p>
//               <i className="fa-solid fa-plus"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ productData }) => {
  const dispatch = useDispatch();

  const addItem = (productData) => {
    dispatch(addToCart(productData));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img src={productData.image} alt={productData.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{productData.name}</h2>
        <p className="text-gray-600 mb-3">{productData.description}</p>
        <p className="text-lg font-bold text-gray-800 mb-4">₹{productData.price}</p>
        <div className="flex justify-between">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            onClick={() => console.log("Purchase method will come here")}
          >
            Purchase
          </button>
          <button
            onClick={() => addItem(productData)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
          >
            <span className="mr-2">Add</span>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
