import * as Yup from "yup";

export const loginSchema = Yup.object({
  identifier: Yup.string().email("wrong email").required("email is required"),
  password: Yup.string().min(6, "password too short").required("Required"),
});

export const registrationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
