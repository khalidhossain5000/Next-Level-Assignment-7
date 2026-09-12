import { useGoogleLogin } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const GoogleLoginComponet = () => {
    const { mutate: googleLogin, isPending } = useGoogleLogin()
    const router = useRouter()
    const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
        console.log(credentialResponse, "Google succes here res ")

        const idToken = credentialResponse?.credential;


        if (!idToken) return toast.error("Google o auth login failed try again")


        googleLogin({ idToken }, {
            onSuccess: (res) => {
                console.log(res, 'Success google login res')
            },
            onError: (err) => {
                const message =
                    (err as any)?.data?.message ||
                    err.message ||
                    "Google login failed";

                console.log(err, "this is google error", message)
                toast.error(message || "Google login failed")
            }
        })



    }


    const handleGoogleError = () => {
        toast.error("Google login failed")
    }
    return (
        <GoogleLogin
            theme="outline"
            shape="pill"
            text="continue_with"
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
        />
    );
};

export default GoogleLoginComponet;