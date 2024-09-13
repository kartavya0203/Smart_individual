import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getAuth();
  }, []);

  const getAuth = async () => {
    try {
      const response = await fetch("", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(addUser(data.user));
        navigate("/");
      } else {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      dispatch(removeUser());
      navigate("/login");
      console.log("error in useAuth");
    }
  };
};

export default useAuth;
