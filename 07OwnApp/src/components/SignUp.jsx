import React, { useState } from "react";
import authService from "../appwrite/auth";
import { login as storeLogin } from "../slices/authSlice";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Logo } from "./index";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const signUpHandler = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
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
          Create an account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form action="" onSubmit={handleSubmit(signUpHandler)}>
          <div className="space-y-5">
            <Input
              label="Name: "
              placeholder="Enter your name"
              {...register("name", {
                required: true,
                maxLength: 20,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
