import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ productData }) => {
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch(addToCart({
      id: productData.id,
      quantity: 1, // You can adjust this if you want to allow quantity selection
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={productData.image}
        alt={productData.product_name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {productData.product_name}
        </h2>
        <p className="text-gray-600 mb-3">{productData.product_description}</p>
        <p className="text-lg font-bold text-gray-800 mb-4">
          ₹{productData.price}
        </p>
        <div className="flex justify-between">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            onClick={() => console.log("Purchase method will come here")}
          >
            Purchase
          </button>
          <button
            onClick={addItem}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
          >
            <span className="mr-2">Add to Cart</span>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;