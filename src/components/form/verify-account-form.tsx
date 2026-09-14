"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Field, FieldDescription, FieldError } from "@/components/ui/field";
import { useVerifyEmail } from "@/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { REGEXP_ONLY_DIGITS } from "input-otp";


const RESEND_COOLDOWN = 16

const otpSlotStyles =
    "size-8 sm:size-11 !rounded-xl border border-input bg-background text-base sm:text-lg font-semibold shadow-sm transition-all data-[active=true]:border-primary data-[active=true]:bg-primary/5 data-[active=true]:text-primary data-[active=true]:ring-4 data-[active=true]:ring-primary/10 data-[active=true]:z-10";

const VerifyAccountForm = ({ email }: { email: string }) => {
    const [otp, setOtp] = useState("")
    const [timer, setTimer] = useState(RESEND_COOLDOWN)
    const [isInvalid, setIsInvalid] = useState(false)
    const { mutate: verifyEmail, isPending } = useVerifyEmail()
    const router = useRouter()

    //resend timer handler
    useEffect(() => {
        const resendTimer = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(resendTimer);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(resendTimer);
    }, []);

    const handleSubmitOtp = () => {
        console.log(otp, 'this is the otp')
        if (otp.length < 6) {
            setIsInvalid(true)
            return
        }
        //--prepare the data

        const verifyData = {
            email,
            otp
        }

        //--data is ready go for the api hit
        verifyEmail(verifyData, {
            onSuccess: (res) => {
                console.log(res, "otp verify success res")
                toast.success("You account is verified and active now")
                //* router.push("/")
            },
            onError: (err: any) => {
                console.log(err, "error in otp verification", err?.data?.message ||
                    err?.response?._data?.message)
                toast.error(
                    err?.data?.message ||
                    err?.response?._data?.message ||
                    "Something went wrong while OTP verification"
                );
            }
        })
    }








    return (
        <Card className="border-0 ring-0 shadow-none p-0">
            <CardContent className="px-0">
                <form
                    id="otp-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleSubmitOtp()
                    }}
                >
                    <Field className="w-full items-center text-center gap-4">
                        <p className="text-sm text-muted-foreground font-manrope">
                            Enter the 6-digit code sent to your email
                        </p>

                        <div className="w-full flex flex-col items-center">
                            <InputOTP
                                maxLength={6}
                                id="otp"
                                name="otp"
                                onChange={(value) => {
                                    setOtp(value)
                                    setIsInvalid(false)
                                }}
                                value={otp}
                                autoComplete="off"
                                pattern={REGEXP_ONLY_DIGITS}
                            >
                                <InputOTPGroup className="flex justify-center gap-1 sm:gap-2.5 py-1">
                                    <InputOTPSlot index={0} className={otpSlotStyles} />
                                    <InputOTPSlot index={1} className={otpSlotStyles} />
                                    <InputOTPSlot index={2} className={otpSlotStyles} />
                                    <InputOTPSlot index={3} className={otpSlotStyles} />
                                    <InputOTPSlot index={4} className={otpSlotStyles} />
                                    <InputOTPSlot index={5} className={otpSlotStyles} />
                                </InputOTPGroup>
                            </InputOTP>
                            {isInvalid && (
                                <FieldError
                                    errors={[{ message: "Invalid Code. Please try again" }]}
                                />
                            )}
                        </div>

                        <FieldDescription className="text-sm text-center">
                            Didn&apos;t receive the code?{" "}
                            <span className="font-medium text-foreground">Resend in {timer} s</span>
                        </FieldDescription>
                    </Field>
                </form>
            </CardContent>

            <CardFooter className="border-t border-t-slate-300 px-0 pt-6 flex flex-col items-center gap-3">
                <Button
                    type="submit"
                    disabled={isPending}
                    form="otp-form"
                    className={`w-full rounded-xl h-11 font-medium shadow-sm cursor-pointer ${isPending && "cursor:not-allowed"}`}
                >
                    {
                        isPending ? "Verifying....." : "Verify Account"
                    }
                </Button>

                <Button
                    type="button"
                    disabled={timer !== 0}
                    variant="outline"
                    className={`w-full rounded-xl h-10 text-muted-foreground hover:text-foreground border-primary/50 ${timer !== 0
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}

                >
                    Resend Code
                </Button>
            </CardFooter>
        </Card>
    );
};

export default VerifyAccountForm;
