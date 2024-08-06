import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "@/redux/user/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

export const useAuth = (type: string) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const check = async (data: {
    username: string;
    email: string;
    phoneNumber: string;
  }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/check`,
        data
      );
      return response.data.message === "Available";
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
      return false;
    }
  };

  const onSubmit = async (data: any) => {
    dispatch(signInStart());
    try {
      if (type === "sign-up") {
        if (!data.username || !data.phoneNumber || !data.email) {
          dispatch(signInFailure("Please fill in all fields."));
          return;
        }

        const isAvailable = await check({
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });
        if (!isAvailable) {
          dispatch(signInFailure("Some fields are already exist."));
          return;
        }
      }

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

      const response = await axios.post(url, payload, {
        withCredentials: true,
      });

      if (type === "sign-up") {
        router.push("/sign-in");
      } else if (type === "sign-in") {
        dispatch(signInSuccess(response.data));
        router.push("/");
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        dispatch(signInFailure(error.response.data.message));
      } else {
        dispatch(signInFailure("An error occurred. Please try again."));
      }
      console.error("Error:", error);
    }
  };

  return { onSubmit, error };
};
