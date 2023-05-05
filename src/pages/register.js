import React from "react";
import AuthLayout from "../components/auth/auth-layout.js";
import RegisterForm from "../components/auth/register-form.js";
const Register = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
export default Register;
