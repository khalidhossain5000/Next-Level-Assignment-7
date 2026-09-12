"use client";

import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import GoogleLoginComponet from "../modules/google/GoogleComponent";
import { useRegisterUser } from "@/hooks";
import { toast } from "sonner";
import { TUserRole } from "@/types";

const RegisterForm = ({role}:{role:TUserRole}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {mutate:register,isPending}  =  useRegisterUser()
  const form = useForm({
    defaultValues:{
        name:"Main Customer",
        email:"mdshafin5000@gmail.com",
        password:"admin"
    },
    onSubmit:({value})=>{
        console.log(value,"register value")
        const registerData={
            name:value.name,
            email:value.email,
            password:value.password,
            role:role
        }
        register(registerData,{
            onSuccess:(res)=>{
                console.log(res,"Register success res")
                toast.success(res.message || "Registration Success Otp send to email")
            },
            onError:(err)=>{
                 const message =
                    (err as any)?.data?.message ||
                    err.message ||
                    "Google login failed";
                console.log(err,"this is register error")
                toast.error(message || "Register failed try again")
            }
        })
    }
  });
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight font-manrope">
          Create your account
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to get started
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* full name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Enter Your Full Name
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className="bg-background rounded-xl shadow-sm "
                    placeholder="Enter Your Full Name"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          {/* email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className="bg-background rounded-xl shadow-sm "
                    placeholder="Enter Your Email Address"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                      className="bg-background rounded-xl shadow-sm"
                      placeholder="Enter Your Password"
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            disabled={isPending}
            className="cursor-pointer rounded-full"
          >
            {isPending && <Spinner />} {isPending ? "Submitting...." : "Submit"}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>Or continue with</FieldSeparator>

      <GoogleLoginComponet />
    </div>
  );
};

export default RegisterForm;
