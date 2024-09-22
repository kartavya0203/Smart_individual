import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import addUser from "../redux/userSlice";
import axios from "axios";

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

  const handleSubmit = async (role) => {
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

    await axios
      .post(
        `http://127.0.0.1:8000/api/${isSignIn ? "login" : "user/register"}/`,

        isSignIn
          ? { email: email.current.value, password: password.current.value }
          : {
              username: username.current.value,
              email: email.current.value,
              password: password.current.value,
            }
      )
      .then(async (response) => {
        if (isSignIn) {
          localStorage.setItem("auth_token", response.data.token);
          navigate("/");
        } else {
          await axios
            .post(
              `http://127.0.0.1:8000/api/login/`,

              {
                email: email.current.value,
                password: password.current.value,
              }
            )
            .then((response) => {
              localStorage.setItem("auth_token", response.data.token);
              addUser(true);
              navigate("/");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-3/12 absolute p-10 border-2 flex flex-col gap-y-5 my-44 mx-auto right-0 left-0 justify-center"
      >
        {!isSignIn && (
          <input
            type="text"
            ref={username}
            placeholder="Enter username"
            className="p-2 bg-gray-200"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Enter Email"
          className="p-2 bg-gray-200"
        />
        <input
          type="password"
          ref={password}
          placeholder="Enter Password"
          className="p-2 bg-gray-200"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 mx-auto w-32 p-2 rounded-lg text-white"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <div className="flex gap-2">
          {isSignIn ? <p>New User?</p> : <p>Already Registered?</p>}

          <div
            onClick={toggleSignIn}
            className="hover:underline cursor-pointer"
          >
            {isSignIn ? "Sign Up now" : "Sign In now"}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
