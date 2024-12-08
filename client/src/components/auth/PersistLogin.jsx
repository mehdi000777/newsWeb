import React, { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "../../app/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectCurrentToken,
  setCredentials,
} from "../../app/authSlice";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const dispatch = useDispatch();

  const firstLogin = localStorage.getItem("firstLogin");

  const [refresh, { isLoading, isError, isSuccess, isUninitialized }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || !import.meta.env.DEV) {
      const verifyRefreshToken = async () => {
        try {
          const res = await refresh().unwrap();
          dispatch(setCredentials(res));
          setTrueSuccess(true);
        } catch (error) {
          toast.error(error?.data?.message);
          dispatch(logOut());
        }
      };

      if (!token && firstLogin) verifyRefreshToken();
    }

    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!firstLogin) {
    content = <Outlet />;
  } else if (isError) {
    content = <Outlet />;
  } else if (isLoading) {
    content = (
      <div className="bg-[rgba(0,0,0,0.2)] w-full h-screen relative top-0 left-0 flex items-center justify-center">
        <ClipLoader size={100} color="#ffffff" className="z-50" />
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
