import { z } from "zod";

const schema = z
  .object({
    name: z.string().nonempty("Name is required"),
    phone: z.string().nonempty("Phone number is required"),
    email: z
      .string()
      .email("Invalid email format")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // Set this path to highlight the confirmPassword field
  });

export default schema;
