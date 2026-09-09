"use client"

import { loginSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";

const LoginForm = () => {


  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: loginSchema
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  })



  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight font-manrope">
          Login to your account
        </h1>
        <p className="text-balance text-sm text-muted-foreground ">
          Enter your email below to login to your account
        </p>
      </div>
      {/* form main*/}

      <form onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
<Field

      </form>
    </div>
  );
};

export default LoginForm;