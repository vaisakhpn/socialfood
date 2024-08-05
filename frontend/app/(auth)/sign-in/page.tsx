import AuthForm from "@/components/ui/form/Authentication/AuthForm";
import React from "react";

const SignIn = () => {
  return (
    <div className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-in" />
    </div>
  );
};

export default SignIn;
