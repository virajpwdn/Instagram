import React, { useState } from "react";
import ToggleDarkMode from "../components/ui/ToggleDarkMode";
import RemixIconComponent from "../components/ui/RemixIconComponent";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BASE_URL + "/users/register", {email, password, firstName, username});
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dark:bg-black overflow-hidden text-textLight dark:text-textDark min-h-screen flex flex-col justify-center items-center gap-3 font-inter pb-16">
      <ToggleDarkMode />
      <div className="form-container w-[100%] max-sm:border-none sm:w-[25%] max-w-[400px] min-w-[400px] flex-shrink-0 border-[1px] rounded-[3px] border-opacity-60 border-[#363636] p-5 px-10">
        <div className="top flex flex-col gap-3 py-3 items-center justify-center">
          <h1 className="font-bold text-5xl font-caveat">Instagram</h1>
          <p className="text-center text-[#A8A8A8] font-semibold tracking-tight leading-1">
            Sign up to see photos and videos from your friends.
          </p>
          <button className="bg-[#0095F6] hover:bg-[#1977F2] text-white font-semibold px-12 py-[0.4rem] rounded-md">
            <RemixIconComponent />
            Log In with Facebook
          </button>
          <div class="flex items-center w-full justify-center my-2">
            <div class="flex-1 border-t border-[0.5px] border-opacity-30 border-gray-300"></div>
            <span class="px-4 text-gray-500 font-bold">OR</span>
            <div class="flex-1 border-t border-[0.5px] border-opacity-30 border-gray-300"></div>
          </div>
        </div>
        <div className="center">
          <form
            id="signupForm"
            onSubmit={formSubmitHandler}
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
            <input
              className="border-[1px] text-sm border-[#DBDBDB] outline-none bg-[#FAFAFA] dark:bg-[#121212] rounded-[3px] p-2 placeholder:font-light placeholder:text-gray-400 placeholder:text-sm"
              type="text"
              placeholder="Full Name or Firstname"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              className="border-[1px] text-sm border-[#DBDBDB] outline-none bg-[#FAFAFA] dark:bg-[#121212] rounded-[3px] p-2 placeholder:font-light placeholder:text-gray-400 placeholder:text-sm"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </form>
        </div>
        <div className="bottom flex flex-col items-center justify-center gap-4 mt-4">
          <p className="text-xs text-center">
            People who use our service may have uploaded your contact
            information to Instagram.
          </p>
          <p className="text-xs text-center">
            By signing up, you agree to our Terms, Privacy Policy and Cookies
            Policy.
          </p>
          <button
            form="signupForm"
            type="submit"
            className="bg-[#0095F6] hover:bg-[#1977F2] text-white font-semibold px-24 py-[0.4rem] rounded-md"
          >
            <RemixIconComponent />
            Sign up
          </button>
        </div>
      </div>
      <div className="login-container w-[100%] max-sm:border-none sm:w-[25%] max-w-[400px] min-w-[400px] flex flex-col gap-1 justify-center items-center border-[1px] rounded-[3px] border-opacity-60 border-[#363636] p-5 px-10">
        <p>Have an account?</p>
        <Link className="text-[#0095F6] font-semibold" to="/login">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
