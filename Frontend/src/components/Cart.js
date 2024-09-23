import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { clearCart, fetchCart, removeFromCart } from "../redux/cartSlice";
import Header from "./Header";
import Footer from "./Footer";

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartItems, status, error } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const deleteCartItem = (cartItem) => {
    dispatch(removeFromCart(cartItem.id));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  // Check if cartItems is an array and has items
  const hasItems = Array.isArray(cartItems) && cartItems.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {!hasItems ? (
          <p className="text-xl text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cartItems.map((cartItem) => (
                <div key={cartItem.id} className="relative">
                  <ProductCard productData={cartItem} cartState={false} />
                  <button
                    onClick={() => deleteCartItem(cartItem)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors duration-300"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 text-right">
              <button
                className="px-6 py-3 text-lg font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;