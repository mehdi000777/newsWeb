import React, { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { Link } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = useState("login");

  return (
    <div className="bg-[url('src/assets/bg-auth.jpg')] bg-cover bg-no-repeat h-screen relative">
      <div className="absolute top-10 left-12">
        <Link
          to="/"
          className="bg-[rgba(0,0,0,0.5)] rounded-lg backdrop-blur-md backdrop-saturate-100 p-4 text-white"
        >
          بازگشت
        </Link>
      </div>
      <div className="w-ful h-full flex justify-center items-center">
        {mode === "login" ? (
          <Login setMode={setMode} />
        ) : (
          <Register setMode={setMode} />
        )}
      </div>
    </div>
  );
};

export default Auth;
