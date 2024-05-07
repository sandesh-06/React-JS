import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../slices/authSlice";
import authService from "../appwrite/auth";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");

  const formSubmitHandler = async (data) => {
    setError("");
    try {
      const session = await authService.loginAccount(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        {/* Logo */}
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        {/* Heading */}
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        {/* Form */}
        <form action="" onSubmit={handleSubmit(formSubmitHandler)} className="mt-8">
            <div className="space-y-5">
                <Input 
                label = "Email: "
                placeholder="enter your email"
                type="email"
                {...register("email", {
                    required:true
                })}
                />
                <Input 
                label = "Password: "
                placeholder="enter your password"
                type="password"
                {...register("password", {
                    required:true
                })}
                />
                <Button type="submit">Sign In</Button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
