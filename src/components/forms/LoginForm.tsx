"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BaseCard from "../cards/BaseCard";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface SignupFormInputs extends LoginFormInputs {
  firstName: string;
  lastName: string;
  role: string;
}

type FormMode = "login" | "signup";

const LoginForm = ({
  onSubmit,
  signedUp,
  loading,
}: {
  onSubmit?: (data: any) => void;
  signedUp: boolean;
  loading?: boolean;
}) => {
  const [mode, setMode] = useState<FormMode>("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs | SignupFormInputs | any>();

  const handleFormSubmit = (data: any) => {
    if (onSubmit) onSubmit(data);
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    reset();
  };

  useEffect(() => {
    if (signedUp) {
      setMode("login");
    }
  }, [signedUp]);

  return (
    <BaseCard className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {mode === "signup" && (
          <>
            <div>
              <label className="block mb-1 font-medium">First Name</label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="w-full border rounded px-3 py-2"
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message as string}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Last Name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className="w-full border rounded px-3 py-2"
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message as string}
                </p>
              )}
            </div>
          </>
        )}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message as string}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message as string}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primaryDark disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Submitting..." : mode === "login" ? "Login" : "Sign up"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          type="button"
          className="text-primary underline text-sm"
          onClick={toggleMode}
        >
          {mode === "login"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>
      </div>
    </BaseCard>
  );
};

export default LoginForm;
