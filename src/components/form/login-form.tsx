"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "../ui/field";
import { loginSchema } from "@/validation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/hooks";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

import { useRouter, useSearchParams } from "next/navigation";

import GoogleLoginComponet from "../modules/google/GoogleComponent";
import { getSafeRedirect } from "@/lib/redirect";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin()
  const router = useRouter()
  const searchParams = useSearchParams();
  const form = useForm({
    defaultValues: {
      email: "powerpulse@admin.com",
      password: "admin",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password
      }
      login(loginData, {
        onSuccess: (res) => {
          toast.success(res.message || "User log-in successfull")
          router.replace(getSafeRedirect(searchParams.get("redirect")))

        },
        onError: (err) => {
          
          toast.error(err.message || "Login failed!Somehting went wrong")
          console.log(err, 'this is error in login')
        }
      })
      console.log(value);
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight font-manrope">
          Login to your account
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
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

          <Button type="submit" disabled={isPending} className="cursor-pointer rounded-full">{isPending && <Spinner />}  {isPending ? "Submitting...." : "Submit"}</Button>
        </FieldGroup>

      </form>

      <FieldSeparator>Or continue with</FieldSeparator>

      <GoogleLoginComponet />

    </div>
  );
}