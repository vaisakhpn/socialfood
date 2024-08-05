import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useAuth = (type: string) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
    setLoading(true);
    setError("");
    try {
      if (type === "sign-up") {
        if (!data.username || !data.phoneNumber || !data.email) {
          setError("Username and email and phoneNumber are required.");
          setLoading(false);
          return;
        }

        const isAvailable = await check({
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });
        if (!isAvailable) {
          setLoading(false);
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

      const response = await axios.post(url, payload);

      if (type === "sign-up") {
        router.push("/sign-in");
      } else if (type === "sign-in") {
        setUser(response.data);
        router.push("/");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, error, loading, user };
};
