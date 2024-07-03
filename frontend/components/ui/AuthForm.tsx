"use client";
import Link from "next/link";
import React, { useState } from "react";
import CustomInput from "../CustomInput";
import Button from "./Button/Button";
import { FcGoogle } from "react-icons/fc";

interface AuthFormProps {
  type: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [user, setUser] = useState(null);

  return (
    <section className="grid grid-cols-2 w-full min-h-screen max-w-7xl mx-auto ">
      <div className="flex flex-col  items-start  justify-center  gap-5 md:gap-8 w-full">
        <Link href="/">
          {/* Logo */}
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Name
          </h1>
          <p className="text-lg mt-3">Something about the website</p>
        </Link>
      </div>
      <div
        className={`flex flex-col  gap-1 md:gap-3 ${
          type === "sign-up" ? "mt-10" : "mt-28"
        }`}
      >
        <div className="border rounded-lg shadow-md border-gray-300 bg-[#F4F4F4] max-w-[500px] max-h-[900px] ">
          <div className="p-5 pl-10 ">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user
                ? "Already Have an Account"
                : type === "sign-in"
                ? "Sign In"
                : "Sign Up"}
              <p className="text-16 font-normal text-gray-600">
                {!user && "Please enter your details"}
              </p>
            </h1>
            <div className="mt-4">
              <form className="space-y-5 ">
                {type === "sign-up" && (
                  <>
                    <CustomInput
                      name="name"
                      placeholder="Eg:Jhon759"
                      label="User name"
                    />
                    <CustomInput
                      name="phone"
                      placeholder="Eg:+91 5268745623"
                      label="Phone Number"
                    />
                  </>
                )}
                <CustomInput
                  name="email"
                  placeholder="jhon@gmail.com"
                  label="Email"
                />
                <CustomInput
                  name="password"
                  placeholder="password"
                  label="Password"
                />
                {type === "sign-up" && (
                  <CustomInput
                    name="password"
                    placeholder="password"
                    label="Confirm Password"
                  />
                )}
                <div className="flex justify-between items-center w-9/12 pt-3">
                  <FcGoogle className="text-3xl ml-10" />
                  <Button
                    label={type === "sign-in" ? "Sign In" : "Sign Up"}
                    buttonColor={type === "sign-in" ? "secondary" : "primary"}
                  />
                </div>
              </form>
              <footer className="flex w-full justify-start pl-16 pt-2 gap-1 ">
                <p className="text-14 font-normal text-gray-600">
                  {type === "sign-in"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </p>
                <Link
                  href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                  className="form-link"
                >
                  {type === "sign-in" ? "Sign up" : "Sign in"}
                </Link>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
