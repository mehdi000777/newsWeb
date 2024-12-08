import React, { useState } from "react";
import { useLoginMutation } from "../../app/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/authSlice";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Login = ({ setMode }) => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { email, password } = inputData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="w-72 bg-[rgba(0,0,0,0.5)] rounded-lg backdrop-blur-md backdrop-saturate-100 p-8 flex flex-col justify-center">
      <h2 className="text-white text-[22px] text-center">خوش آمدید</h2>
      <form onSubmit={submitHandler} className="flex flex-col mt-4">
        <input
          placeholder="ایمیل"
          name="email"
          type="text"
          className="py-1 px-2 rounded-sm"
          onChange={handleChange}
        />
        <input
          placeholder="رمز عبور"
          name="password"
          type="text"
          className="mt-4 py-1 px-2 rounded-sm"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="mt-4 bg-primary text-white py-1 px-2 text-lg rounded-sm flex items-center justify-center"
        >
          {isLoading ? <ClipLoader color="#ffffff" size={18} /> : "ورود"}
        </button>
      </form>
      <button
        onClick={() => setMode("register")}
        className="mt-4 text-center text-white hover:text-orange transition-all"
      >
        ثبت نام کنید
      </button>
    </div>
  );
};

export default Login;
