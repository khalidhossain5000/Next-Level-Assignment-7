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
import type { TUserRole } from "@/types";
import { registerUserValidationSchema } from "@/validation";
import { useRouter, useSearchParams } from "next/navigation";
import { getSafeRedirect } from "@/lib/redirect";

const RegisterForm = ({ role }: { role: TUserRole }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: register, isPending } = useRegisterUser()
  const router = useRouter()
  const searchParams = useSearchParams();
  console.log(role, 'user role')
  const form = useForm({
    defaultValues: {
      name: "Main Customer",
      email: "admin@powerpulse.coms",
      password: "admin"
    },
    validators: {
      onSubmit: registerUserValidationSchema
    },
    onSubmit: ({ value }) => {
      console.log(value, "register value")
      const registerData = {
        name: value.name,
        email: value.email,
        password: value.password,
        role: role
      }
      register(registerData, {
        onSuccess: (res) => {
          console.log(res, "Register success res")
          toast.success(res.message || "Registration Success Otp send to email")
          const params = new URLSearchParams({ email: registerData.email })
          const redirect = getSafeRedirect(searchParams.get("redirect"), "")
          if (redirect) params.set("redirect", redirect)

          router.push(`/${role}/register/verify-account?${params.toString()}`)
        },
        onError: (err) => {
          const message =
            (err as any)?.data?.message ||
            err.message ||
            "Registration failed";
          console.log(err, "this is register error")
          toast.error(message || "Registration failed try again")
        }
      })
    }
  });
  return (
    <div className="flex flex-col gap-5">
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
                    className="rounded-xl border-border bg-background shadow-sm"
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
                    className="rounded-xl border-border bg-background shadow-sm"
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
                      className="rounded-xl border-border bg-background shadow-sm"
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
            className="min-h-11 w-full rounded-lg font-semibold"
          >
            {isPending && <Spinner />} {isPending ? "Submitting...." : "Submits"}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>Or continue with</FieldSeparator>
      {/* <Suspense fallback={null}></Suspense> */}
      <GoogleLoginComponet role={role} />
    </div>
  );
};

export default RegisterForm;
