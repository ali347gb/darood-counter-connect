
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import PersonalInfoStep from "./signup/PersonalInfoStep";
import LocationSelector from "./signup/LocationSelector";
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
      whatsappNumber: "",
      country: "",
      state: "",
      city: "",
      verificationMethod: "email",
      verificationCode: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, watch, setValue, trigger, formState: { isValid } } = methods;

  const watchEmail = watch("email");
  const watchWhatsappNumber = watch("whatsappNumber");
  const watchVerificationMethod = watch("verificationMethod");
  const watchVerificationCode = watch("verificationCode");
  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");

  const handleSendVerification = async () => {
    const isValid = await trigger(["email", "whatsappNumber", "firstName", "lastName", "country", "state", "city"]);
    
    if (!isValid) {
      return;
    }

    if (watchVerificationMethod === "email" && !watchEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }
    
    if (watchVerificationMethod === "whatsapp" && !watchWhatsappNumber) {
      toast({
        title: "Error",
        description: "Please enter a WhatsApp number",
        variant: "destructive"
      });
      return;
    }

    setVerificationSent(true);
    
    toast({
      title: "Verification Code Sent",
      description: watchVerificationMethod === "email" 
        ? `A verification code has been sent to ${watchEmail}` 
        : `A verification code has been sent to your WhatsApp (${watchWhatsappNumber})`,
    });
    
    toast({
      title: "Demo Note",
      description: "For this demo, please use '123456' as the verification code",
    });
  };

  const onSubmit = async (data: SignupFormValues) => {
    if (data.verificationCode !== "123456") {
      toast({
        title: "Error",
        description: "Invalid verification code",
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
        whatsappNumber: data.whatsappNumber,
        country: data.country,
        state: data.state,
        city: data.city
      });
      
      toast({
        title: "Success",
        description: "Your account has been created. Welcome to Markaz-e-Darood!",
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
              <LocationSelector />
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
