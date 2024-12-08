import React, { useState } from "react";
import { useRegisterMutation } from "../../app/authApiSlice";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../app/authSlice";
import { toast } from "react-toastify";

const Register = ({ setMode }) => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { name, email, password } = inputData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(res));
      console.log(res);
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
          placeholder="نام"
          name="name"
          type="text"
          className="py-1 px-2 rounded-sm"
          onChange={handleChange}
        />
        <input
          placeholder="ایمیل"
          name="email"
          type="text"
          className="py-1 px-2 mt-4 rounded-sm"
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
          className="mt-4 bg-primary text-white py-1 px-2 text-lg rounded-sm"
        >
          {isLoading ? <ClipLoader size={18} color="#ffffff" /> : "ثبت نام"}
        </button>
      </form>
      <button
        onClick={() => setMode("login")}
        className="mt-4 text-center text-white hover:text-orange transition-all"
      >
        وارد شوید
      </button>
    </div>
  );
};

export default Register;
