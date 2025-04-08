
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import PersonalInfoStep from "./signup/PersonalInfoStep";
import VerificationStep from "./signup/VerificationStep";
import PasswordStep from "./signup/PasswordStep";
import GoogleSignupButton from "./signup/GoogleSignupButton";
import { signupSchema, type SignupFormValues } from "@/schemas/signup-schema";

const SignupForm: React.FC = () => {
  const [verificationSent, setVerificationSent] = useState(false);
  
  const { registerWithEmail, loginWithGoogle, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const methods = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      verificationMethod: "email",
      verificationCode: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, watch, setValue, trigger, formState: { isValid } } = methods;

  const watchEmail = watch("email");
  const watchVerificationCode = watch("verificationCode");
  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");

  const handleSendVerification = async () => {
    const isValid = await trigger(["email", "firstName", "lastName"]);
    
    if (!isValid) {
      return;
    }

    if (!watchEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    setVerificationSent(true);
    
    toast({
      title: "Demo Mode - Verification Code",
      description: "In a real application, a verification code would be sent. For this demo, please use '123456'",
    });
  };

  const onSubmit = async (data: SignupFormValues) => {
    if (data.verificationCode !== "123456") {
      toast({
        title: "Error",
        description: "Invalid verification code. For this demo, please use '123456'",
        variant: "destructive"
      });
      return;
    }

    try {
      await registerWithEmail({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        whatsappNumber: "", // Sending empty string for WhatsApp
        country: "",
        state: "",
        city: ""
      });
      
      toast({
        title: "Success",
        description: "Your account has been created. Please update your profile with additional information.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Sign up to track your Darood-e-Pak recitations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GoogleSignupButton onClick={() => loginWithGoogle()} loading={loading} />

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or sign up with
            </span>
          </div>
        </div>

        <FormProvider {...methods}>
          {!verificationSent ? (
            <div className="space-y-6">
              <PersonalInfoStep />
              <VerificationStep 
                onSubmit={handleSendVerification}
                loading={loading}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <VerificationStep 
                onSubmit={() => {}}
                loading={loading}
              />
              <PasswordStep 
                onSubmit={handleSubmit(onSubmit)}
                isValid={isValid && watchVerificationCode.length === 6 && !!watchPassword && watchPassword === watchConfirmPassword}
                loading={loading}
              />
            </div>
          )}
        </FormProvider>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="text-emerald-600 hover:underline">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
