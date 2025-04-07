
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import PersonalInfoStep from "./signup/PersonalInfoStep";
import LocationSelector from "./signup/LocationSelector";
import VerificationStep from "./signup/VerificationStep";
import PasswordStep from "./signup/PasswordStep";
import GoogleSignupButton from "./signup/GoogleSignupButton";

const SignupForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationMethod, setVerificationMethod] = useState<"email" | "whatsapp">("email");
  const [verificationSent, setVerificationSent] = useState(false);
  
  const { registerWithEmail, loginWithGoogle, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationSent(true);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (!firstName || !lastName) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive"
      });
      return;
    }

    if (!country || !state || !city) {
      toast({
        title: "Error",
        description: "Please select your location",
        variant: "destructive"
      });
      return;
    }

    if (verificationCode !== "123456") {
      toast({
        title: "Error",
        description: "Invalid verification code",
        variant: "destructive"
      });
      return;
    }

    try {
      await registerWithEmail({
        email,
        password,
        firstName,
        lastName,
        whatsappNumber,
        country,
        state,
        city
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

        {!verificationSent ? (
          <div className="space-y-6">
            <PersonalInfoStep 
              firstName={firstName}
              lastName={lastName}
              email={email}
              whatsappNumber={whatsappNumber}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
              onEmailChange={setEmail}
              onWhatsappNumberChange={setWhatsappNumber}
            />
            
            <LocationSelector 
              selectedCountry={country}
              selectedState={state}
              selectedCity={city}
              onCountryChange={setCountry}
              onStateChange={setState}
              onCityChange={setCity}
            />
            
            <VerificationStep 
              email={email}
              whatsappNumber={whatsappNumber}
              verificationMethod={verificationMethod}
              verificationCode={verificationCode}
              onVerificationMethodChange={setVerificationMethod}
              onVerificationCodeChange={setVerificationCode}
              onSubmit={handleSendVerification}
              loading={loading}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-2">
              <VerificationStep 
                email={email}
                whatsappNumber={whatsappNumber}
                verificationMethod={verificationMethod}
                verificationCode={verificationCode}
                onVerificationMethodChange={setVerificationMethod}
                onVerificationCodeChange={setVerificationCode}
                onSubmit={() => {}}
                loading={loading}
              />
            </div>
            
            <PasswordStep 
              password={password}
              confirmPassword={confirmPassword}
              onPasswordChange={setPassword}
              onConfirmPasswordChange={setConfirmPassword}
              onSubmit={handleSignup}
              isValid={verificationCode.length === 6 && !!password && password === confirmPassword}
              loading={loading}
            />
          </div>
        )}
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
