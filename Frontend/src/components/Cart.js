// import { useDispatch, useSelector } from "react-redux";
// import ProductCard from "./ProductCard";
// import { clearCart, removeFromCart } from "../redux/cartSlice";
// import Header from "./Header";
// import Footer from "./Footer";

// const Cart = () => {
//   const cartItem = useSelector((store) => store.cart.cart);
//   const dispatch = useDispatch();
//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };
//   const deleteCartItem = (cartitem) => {
//     dispatch(removeFromCart(cartitem));
//   };
//   return (
//     <div>
//       <Header />
//       <div>
//         {cartItem.map((cartitem) => (
//           <div>
//             <ProductCard productData={cartitem} cartState={false} />
//             <button onClick={() => deleteCartItem(cartitem)}>
//               <i className="fa-solid fa-trash"></i>
//             </button>
//           </div>
//         ))}
//       </div>
//       <button
//         className="p-3 text-md font-semibold bg-red-500"
//         onClick={handleClearCart}
//       >
//         Clear Cart
//       </button>
//       <Footer />
//     </div>
//   );
// };

// export default Cart;

import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { clearCart, fetchCart, removeFromCart } from "../redux/cartSlice";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  //dispatch(fetchCart())
  

  useEffect(() => {

    dispatch(fetchCart()); // Fetch cart data on mount
  }, [dispatch])

  const cartItems = useSelector((store) => store.cart.cart);
  // const {items}=cart
  // const [cartItems,setCartItems]=useState([])
  // setCartItems(items)
  // console.log(items)
   if(!cartItems)return 
 
  

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const deleteCartItem = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {cartItems? (
          <p className="text-xl text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cartItems.map((cartItem) => ( 
                <div key={cartItem.id} className="relative">
                  <ProductCard productData={cartItem} cartState={false} />
                  <button
                    onClick={() => deleteCartItem(cartItem.name)}
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
