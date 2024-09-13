// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <div>
//       {/* <div>
//         Footer
//         <li>
//           <li>
//             <Link to="/" className="text-xl font-bold text-white">
//               About Us
//             </Link>
//           </li>
//           <li>
//             <Link to="/" className="text-xl font-bold text-white">
//               Contact Us
//             </Link>
//           </li>
//         </li>
//       </div> */}
//       <footer className="bg-gray-800 text-gray-300 py-8 relative left-0 right-0 bottom-0 ">
//         <div className="container mx-auto px-6 lg:px-20 flex flex-col md:flex-row justify-between">
//           <div className="mb-8 md:mb-0 md:w-1/3">
//             <h2 className="text-xl font-semibold text-white mb-4">About Us</h2>
//             <p className="text-gray-400">
//               We are a leading company in furniture renting, offering a wide
//               range of high-quality furniture at affordable prices.
//             </p>
//           </div>

//           <div className="mb-8 md:mb-0 md:w-1/3">
//             <h2 className="text-xl font-semibold text-white mb-4">
//               Quick Links
//             </h2>
//             <ul>
//               <li className="mb-2">
//                 <Link to="/" className="text-lg hover:underline text-white">
//                   Home
//                 </Link>
//               </li>

//               <li className="mb-2">
//                 <Link
//                   to="/about"
//                   className="text-lg hover:underline text-white"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li className="mb-2">
//                 <Link
//                   to="/contact"
//                   className="text-lg hover:underline text-white"
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div className="md:w-1/3">
//             <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
//             <div className="flex space-x-4">
//               <i className="fab fa-facebook fa-lg hover:text-white"></i>
//               <i className="fab fa-twitter fa-lg hover:text-white"></i>
//               <i className="fab fa-instagram fa-lg hover:text-white"></i>
//               <i className="fab fa-linkedin fa-lg hover:text-white"></i>
//             </div>
//           </div>
//         </div>
//         <div className="mt-8 border-t border-gray-700 pt-4 text-center">
//           <p>&copy; 2024 Your Company. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Footer;


import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">About Us</h2>
          <p className="text-gray-400 leading-relaxed">
            We are a leading company in agricultural technology, offering innovative solutions to help farmers improve their crop yields and market their products effectively.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            {['Home', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-lg hover:text-white transition duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
              <a key={social} href={`#${social}`} className="text-2xl hover:text-white transition duration-300">
                <i className={`fab fa-${social}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8 text-center">
        <p>&copy; 2024 AgroPredict. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;