"use client";

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import {
    Field,
    FieldDescription,
} from "@/components/ui/field";

const otpSlotStyles =
    "size-8 sm:size-11 !rounded-xl border border-input bg-background text-base sm:text-lg font-semibold shadow-sm transition-all data-[active=true]:border-primary data-[active=true]:bg-primary/5 data-[active=true]:text-primary data-[active=true]:ring-4 data-[active=true]:ring-primary/10 data-[active=true]:z-10";

const VerifyAccountForm = () => {
    return (
        <Card className="!border-0 !ring-0 !shadow-none p-0">
            <CardContent className="px-0">
                <Field className="w-full items-center text-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        Enter the 6-digit code sent to your email
                    </p>

                    <div className="w-full flex justify-center">
                        <InputOTP maxLength={6} id="otp" name="otp">
                            <InputOTPGroup className="flex justify-center gap-1 sm:gap-2.5">
                                <InputOTPSlot index={0} className={otpSlotStyles} />
                                <InputOTPSlot index={1} className={otpSlotStyles} />
                                <InputOTPSlot index={2} className={otpSlotStyles} />
                                <InputOTPSlot index={3} className={otpSlotStyles} />
                                <InputOTPSlot index={4} className={otpSlotStyles} />
                                <InputOTPSlot index={5} className={otpSlotStyles} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    <FieldDescription className="text-sm text-center">
                        Didn&apos;t receive the code?{" "}
                        <span className="font-medium text-foreground">
                            Resend in 00:59
                        </span>
                    </FieldDescription>
                </Field>
            </CardContent>

            <CardFooter className="border-t border-t-slate-300 px-0 pt-6 flex flex-col items-center gap-3">
                <Button
                    type="submit"
                    className="w-full rounded-xl h-11 font-medium shadow-sm cursor-pointer"
                >
                    Verify Account
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-xl h-10 text-muted-foreground hover:text-foreground cursor-pointer border-primary/50"
                >
                    Resend Code
                </Button>
            </CardFooter>
        </Card>
    );
};

export default VerifyAccountForm;