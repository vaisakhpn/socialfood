"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../CustomInput";
import Button from "../../Button/Button";
import { FcGoogle } from "react-icons/fc";
import schema from "./constant";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const formSchema = schema(type);

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError("");
    try {
      const url =
        type === "sign-up"
          ? `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`
          : `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`;

      const payload =
        type === "sign-up"
          ? {
              username: data.username,
              phoneNumber: data.phoneNumber,
              email: data.email,
              password: data.password,
            }
          : {
              email: data.email,
              password: data.password,
            };

      const response = await axios.post(url, payload);

      if (type === "sign-up") {
        router.push("/sign-in");
      } else if (type === "sign-in") {
        setUser(response.data);
        console.log(response.data);
        router.push("/");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid grid-cols-2 w-full min-h-screen max-w-7xl mx-auto">
      <div className="flex flex-col items-start justify-center gap-5 md:gap-8 w-full">
        <Link href="/">
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Name
          </h1>
          <p className="text-lg mt-3">Something about the website</p>
        </Link>
      </div>
      <div
        className={`flex flex-col gap-1 md:gap-3 ${
          type === "sign-up" ? "mt-10" : "mt-28"
        }`}
      >
        <div className="border rounded-lg shadow-md border-gray-300 bg-[#F4F4F4] max-w-[500px] max-h-[900px]">
          <div className="p-5 pl-10">
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
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {type === "sign-up" && (
                    <>
                      <CustomInput
                        name="username"
                        placeholder="Eg: Jhon759"
                        label="User name"
                        type="text"
                      />
                      <CustomInput
                        name="phoneNumber"
                        placeholder="Eg: +91 5268745623"
                        label="Phone Number"
                        type="text"
                      />
                    </>
                  )}

                  <CustomInput
                    name="email"
                    placeholder="jhon@gmail.com"
                    label="Email"
                    type="email"
                  />
                  <CustomInput
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                  />
                  {type === "sign-up" && (
                    <CustomInput
                      name="confirmPassword"
                      placeholder="confirm password"
                      label="Confirm Password"
                      type="password"
                    />
                  )}
                  <div className="flex justify-between items-center w-9/12 pt-3">
                    <FcGoogle className="text-3xl ml-10" />
                    <Button
                      label={
                        loading
                          ? "Processing..."
                          : type === "sign-in"
                          ? "Sign In"
                          : "Sign Up"
                      }
                      buttonColor={type === "sign-in" ? "secondary" : "primary"}
                      disabled={loading}
                    />
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                </form>
              </FormProvider>
              <footer className="flex w-full justify-start pl-16 pt-2 gap-1">
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
