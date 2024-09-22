import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser, setIsSignIn } from "../redux/userSlice";
import logo from "../assest/logo.png";
import { useState } from "react";
const Header = () => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    localStorage.removeItem("auth_token");
    setUser(false);
    // dispatch(removeUser());
  };
  // const user = useSelector((store) => store.user.user);
  const [user, setUser] = useState(localStorage.getItem("auth_token"));
  const navigate = useNavigate();
  const goToLogin = (isSignIn) => {
    dispatch(setIsSignIn(isSignIn));
    navigate("/login");
  };
  return (
    <div className="w-full flex justify-between items-center p-6 bg-gradient-to-b from-black absolute z-10">
      <div>
        <Link to="/">
          <img className="w-60 	margin-top: 0px;" src={logo} alt="logo" />
        </Link>
      </div>
      <div>
        <ul className="flex gap-x-20">
          <li>
            <Link
              to="/"
              className="text-xl font-bold text-white hover:underline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="text-xl font-bold text-white hover:underline"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/yield-analysis"
              className="text-xl font-bold text-white hover:underline"
            >
              Yield Analysis
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-xl font-bold text-white hover:underline"
            >
              Cart
            </Link>
          </li>
          {user ? (
            <li>
              <button
                onClick={handleSignOut}
                className="text-xl font-bold text-white hover:underline"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <>
              <li>
                <button
                  className="text-xl font-bold text-white hover:underline"
                  onClick={() => goToLogin(true)}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className="text-xl font-bold text-white hover:underline"
                  onClick={() => goToLogin(false)}
                >
                  Signup
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;

// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { removeUser } from "../redux/userSlice";
// import logo from "../assest/logo.png";

// const Header = () => {
//   const dispatch = useDispatch();

//   const handleSignOut = () => {
//     localStorage.removeItem("access_token");
//     dispatch(removeUser());
//   };

//   return (
//     <header className="fixed w-full bg-gradient-to-b from-black to-transparent z-50">
//       <div className="container mx-auto flex justify-between items-center p-4">
//         <div>
//           <img className="w-48" src={logo} alt="logo" />
//         </div>
//         <nav>
//           <ul className="flex space-x-6">
//             {['Home', 'Shop', 'Yield Analysis', 'Cart'].map((item) => (
//               <li key={item}>
//                 <Link
//                   to="/yield-analysis"
//                   className="text-lg font-semibold text-white hover:text-gray-300 transition duration-300"
//                 >
//                   {item}
//                 </Link>
//               </li>
//             ))}
//             <li>
//               <button
//                 onClick={handleSignOut}
//                 className="text-lg font-semibold text-white hover:text-gray-300 transition duration-300"
//               >
//                 Sign Out
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
