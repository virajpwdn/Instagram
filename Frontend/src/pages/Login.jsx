import React, { useState } from "react";
import ToggleDarkMode from "../components/ui/ToggleDarkMode";
import RemixIconComponent from "../components/ui/RemixIconComponent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BASE_URL + "/users/login", {
        email,
        password,
      });
      // dispatch(addUser(response.data.userLogin));
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    }
  };
  return (
    <div className="dark:bg-black overflow-hidden text-textLight dark:text-textDark min-h-screen flex flex-col justify-center items-center gap-3 font-inter pb-16 w-full">
      <ToggleDarkMode />
      <div className="form-container w-[100%] max-sm:border-none sm:w-[25%] max-w-[400px] min-w-[400px] flex-shrink-0 border-[1px] rounded-[3px] border-opacity-60 border-[#363636] p-5 px-10">
        <div className="top flex flex-col gap-3 py-8 items-center justify-center mb-5">
          <h1 className="font-bold text-5xl font-caveat">Instagram</h1>
        </div>
        <div className="center">
          <form
            id="loginForm"
            onSubmit={loginHandler}
            className="flex flex-col gap-2 text-textLight dark:text-textDark"
          >
            <input
              className="border-[1px] text-sm border-[#DBDBDB] outline-none bg-[#FAFAFA] dark:bg-[#121212] rounded-[3px] p-2 placeholder:font-light placeholder:text-gray-400 placeholder:text-sm"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="border-[1px] text-sm border-[#DBDBDB] outline-none bg-[#FAFAFA] dark:bg-[#121212] rounded-[3px] p-2 placeholder:font-light placeholder:text-gray-400 placeholder:text-sm"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </form>
        </div>
        <div className="bottom flex flex-col items-center justify-center gap-4 mt-4">
          <button
            type="submit"
            form="loginForm"
            className="bg-[#0095F6] w-full hover:bg-[#1977F2] text-white font-semibold px-24 py-[0.4rem] rounded-md"
          >
            <RemixIconComponent />
            Login
          </button>
          <div className="flex items-center w-full justify-center my-2">
            <div className="flex-1 border-t border-[0.5px] border-opacity-30 border-gray-300"></div>
            <span className="px-4 text-gray-500 font-bold">OR</span>
            <div className="flex-1 border-t border-[0.5px] border-opacity-30 border-gray-300"></div>
          </div>
        </div>
        <button className="flex items-center font-medium font-inter w-full gap-2 text-[#1977F2] hover:text-textLight hover:dark:text-textDark justify-center text-sm">
          <RemixIconComponent
            name="facebook-circle-fill"
            className="text-2xl text-[#1977F2] dark:text-[#1977F2]"
          />{" "}
          Login in with Facebook
        </button>
        <button className="text-sm text-center w-full">
          <RemixIconComponent />
          Forgottten your password?
        </button>
      </div>
      <div className="login-container w-[100%] max-sm:border-none sm:w-[25%] max-w-[400px] min-w-[400px] flex flex-col gap-1 justify-center items-center border-[1px] rounded-[3px] border-opacity-50 border-[#363636] p-5 px-10">
        <Link className="container-2 font-medium" to="/signup">
          Don't have account?{" "}
          <span className="text-[#1977F2] font-semibold">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
