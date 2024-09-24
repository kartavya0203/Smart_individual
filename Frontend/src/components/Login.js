import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/userSlice"; // Make sure you import the action correctly
import axios from "axios";
import Header from "./Header"; // Import the Header component

const SignUp = () => {
  const signIn = useSelector((store) => store.user.isSignIn);
  const [isSignIn, setIsSignIn] = useState(signIn);
  const [credentials, setCredentials] = useState();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (isSignIn) {
      setCredentials({
        email: email.current.value,
        password: password.current.value,
      });
    } else {
      setCredentials({
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      });
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/${isSignIn ? "login" : "user/register"}/`,
        isSignIn
          ? { email: email.current.value, password: password.current.value }
          : {
              username: username.current.value,
              email: email.current.value,
              password: password.current.value,
            }
      );

      console.log("Login response:", response); // Check the response
      localStorage.setItem("auth_token", response.data.token);
      
      if (isSignIn) {
        localStorage.setItem("auth_token", response.data.token);
        dispatch(addUser(true));
        console.log("Navigating to home"); // Check if this gets logged
        navigate("/"); // Redirect after successful login
      } else {
        // Handle registration logic here
        await axios.post(
          `http://127.0.0.1:8000/api/login/`,
          {
            email: email.current.value,
            password: password.current.value,
          }
        ).then((response) => {
          localStorage.setItem("auth_token", response.data.token);
          dispatch(addUser(true));
          navigate("/"); // Redirect after successful registration
        });
      }
    } catch (error) {
      console.error("Error during login:", error); // Log any errors
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat">
      <Header /> 
      <div className="flex justify-center items-center flex-grow mt-20">
        <form
          onSubmit={handleSubmit} // Use the handleSubmit function here
          className="w-3/12 p-10 border-2 border-green-400 rounded-lg shadow-lg flex flex-col gap-y-5 bg-white"
        >
          <h2 className="text-center text-3xl font-bold text-green-600 mb-5">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>

          {!isSignIn && (
            <input
              type="text"
              ref={username}
              placeholder="Enter username"
              className="p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            />
          )}
          <input
            type="text"
            ref={email}
            placeholder="Enter Email"
            className="p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />
          <input
            type="password"
            ref={password}
            placeholder="Enter Password"
            className="p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />

          <button
            type="submit" // Use type="submit" to trigger form submission
            className="bg-green-500 mx-auto w-32 p-2 rounded-lg text-white hover:bg-green-600 transition duration-200"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          <div className="flex gap-2 text-gray-700">
            {isSignIn ? <p>New User?</p> : <p>Already Registered?</p>}
            <div
              onClick={toggleSignIn}
              className="hover:underline cursor-pointer text-green-500"
            >
              {isSignIn ? "Sign Up now" : "Sign In now"}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
