import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../store/userSlice";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUserAuthenticated = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(removeUser());
      navigate("/login");
      return false;
    }
    if (token) {
      try {
        const response = await axios.get(BASE_URL + "/users/profile", {
          headers: { Authorization: `berear ${token}` },
        });
        console.log(response.data);
        dispatch(addUser(response.data));
      } catch (error) {
        console.log(error.response?.data?.message);
        localStorage.removeItem("token");
        dispatch(removeUser());
        navigate("/login");
        return false;
      }
    }
  };

  useEffect(() => {
    isUserAuthenticated();

    const handleStorageChange = async () => {
      const isAuthenticated = await isUserAuthenticated();
      if (!isAuthenticated) dispatch(removeUser());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);
  return children;
};

export default ProtectedRoutes;
