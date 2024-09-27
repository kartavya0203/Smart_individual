import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearCart, fetchCart, removeFromCart } from "../redux/cartSlice";
import Header from "./Header";
import Footer from "./Footer";

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartData, status, error } = useSelector((store) => store.cart);
  const isAuthenticated = !!localStorage.getItem("auth_token");

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const deleteCartItem = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  useEffect(() => {
    console.log("cart updated", cartData);
  }, [cartData]);

  if (status === 'loading') return <div className="text-center">Loading your cart...</div>;
  if (status === 'failed') return <div className="text-center text-red-500">Error: {error}</div>;

  let cartItems = isAuthenticated ? cartData.items || [] : cartData || [];
  const hasItems = cartItems.length > 0;

  const totalCost = hasItems ? cartItems.reduce((acc, item) => {
    return acc + (parseFloat(item.product_price) * item.quantity);
  }, 0) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 mt-20">
        <h1 className="text-3xl font-bold mb-8">Your Bill</h1>
        {!hasItems ? (
          <p className="text-xl text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product Name</th>
                  <th className="text-left py-2">Price (₹)</th>
                  <th className="text-left py-2">Quantity</th>
                  <th className="text-left py-2">Total (₹)</th>
                  <th className="text-right py-2"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem) => (
                  <tr key={isAuthenticated ? cartItem.id : cartItem.product_id} className="border-b">
                    <td className="py-2">{cartItem.product_name}</td>
                    <td className="py-2">{parseFloat(cartItem.product_price).toFixed(2)}</td>
                    <td className="py-2">{cartItem.quantity}</td> {/* Display quantity without buttons */}
                    <td className="py-2">
                      {(parseFloat(cartItem.product_price) * cartItem.quantity).toFixed(2)}
                    </td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => deleteCartItem(isAuthenticated ? cartItem.id : cartItem.product_id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center font-semibold">
              <h2 className="text-xl">Total Cost: <span className="text-green-600">₹{totalCost.toFixed(2)}</span></h2>
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                onClick={handleClearCart}
                aria-label="Clear all items from cart"
              >
                Clear Cart
              </button>
            </div>
            <div className="mt-6">
              <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
