import React from "react";
import AuthWrapper from "../components/layout/AuthWrapper";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../utils/formValidator";
import { useState } from "react";

const ForgotPassword = () => {
  const [IsSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = (data) => {
    setIsSubmitting(true);
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthWrapper>
      <div className="bg-white py-[29px] px-[26px] rounded-lg shadow-lg w-full max-w-[505px] h-[457px] ">
        <Link to="/register">
          <button className="flex items-center gap-1.5 mt-4">
            <FaArrowLeft /> Back
          </button>
        </Link>

        <h1 className="text-[30px] font-bold  mt-10">Forgot your password?</h1>
        <p className="text-[#666] text-[16px]  font-normal">
          We will send instructions to your email to reset your password.
        </p>

        <form onSubmit={handleSubmit(handleForgotPassword)} className="mt-6">
          <label htmlFor="Email"></label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Enter Email"
            className="input w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <button
            type="submit"
            className="btn w-full font-semibold mt-5 bg-black text-white"
          >
            {IsSubmitting ? (
              <span className="loading loading-spinner loading-md text-black"></span>
            ) : (
              "Log in"
            )}
          </button>
        </form>
        <p className="text-[#666] text-[16px] font-normal mt-15 flex items-center justify-center">
          Remember you Password?{" "}
          <span className="text-black font-bold"> Sign in</span>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
