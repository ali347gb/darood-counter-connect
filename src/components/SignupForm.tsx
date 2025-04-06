
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, MessageCircle, User, MapPin, Flag, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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

  // Mock country data - in a real app, this would come from an API
  const countries = [
    { code: "PK", name: "Pakistan" },
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
  ];

  // Mock states data - in a real app, this would be filtered based on country
  const states = {
    PK: [
      { code: "PB", name: "Punjab" },
      { code: "SD", name: "Sindh" },
      { code: "KP", name: "Khyber Pakhtunkhwa" },
      { code: "BA", name: "Balochistan" },
    ],
    US: [
      { code: "NY", name: "New York" },
      { code: "CA", name: "California" },
      { code: "TX", name: "Texas" },
    ],
    // Add states for other countries as needed
  };

  // Mock cities data - in a real app, this would be filtered based on state
  const cities = {
    PB: ["Lahore", "Faisalabad", "Rawalpindi", "Multan"],
    SD: ["Karachi", "Hyderabad", "Sukkur"],
    KP: ["Peshawar", "Abbottabad", "Swat"],
    BA: ["Quetta", "Gwadar", "Khuzdar"],
    NY: ["New York City", "Buffalo", "Rochester"],
    CA: ["Los Angeles", "San Francisco", "San Diego"],
    TX: ["Houston", "Austin", "Dallas"],
    // Add cities for other states as needed
  };

  const handleSendVerification = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation checks
    if (verificationMethod === "email" && !email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }
    
    if (verificationMethod === "whatsapp" && !whatsappNumber) {
      toast({
        title: "Error",
        description: "Please enter a WhatsApp number",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send a verification code
    setVerificationSent(true);
    
    toast({
      title: "Verification Code Sent",
      description: verificationMethod === "email" 
        ? `A verification code has been sent to ${email}` 
        : `A verification code has been sent to your WhatsApp (${whatsappNumber})`,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation checks
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

    // In a real app, this would verify the code and register the user
    if (verificationCode !== "123456") { // Mock verification code
      toast({
        title: "Error",
        description: "Invalid verification code",
        variant: "destructive"
      });
      return;
    }

    try {
      // In a real app, this would register the user with all information
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
        <Button
          variant="outline"
          className="w-full mb-4 border-emerald-500 hover:bg-emerald-50"
          onClick={() => loginWithGoogle()}
          disabled={loading}
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>

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
          <form onSubmit={handleSendVerification}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">
                    <User className="w-4 h-4 inline mr-1" />
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="whatsapp">
                  <MessageCircle className="w-4 h-4 inline mr-1" />
                  WhatsApp Number
                </Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="+921234567890"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  required
                  className="focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="country">
                  <Flag className="w-4 h-4 inline mr-1" />
                  Country
                </Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {country && (
                <div className="grid gap-2">
                  <Label htmlFor="state">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    State/Province
                  </Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select state/province" />
                    </SelectTrigger>
                    <SelectContent>
                      {states[country as keyof typeof states]?.map((state) => (
                        <SelectItem key={state.code} value={state.code}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {state && (
                <div className="grid gap-2">
                  <Label htmlFor="city">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    City
                  </Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities[state as keyof typeof cities]?.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="grid gap-2">
                <Label htmlFor="verificationMethod">Verification Method</Label>
                <Select 
                  value={verificationMethod} 
                  onValueChange={(value) => setVerificationMethod(value as "email" | "whatsapp")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select verification method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={loading || (verificationMethod === "email" && !email) || (verificationMethod === "whatsapp" && !whatsappNumber)}
                type="submit"
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="verification">Verification Code</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="verification"
                    type="text"
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                    maxLength={6}
                    className="focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  {verificationCode.length === 6 && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  A verification code has been sent to your {verificationMethod === "email" ? "email" : "WhatsApp"}
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={loading || verificationCode.length !== 6 || !password || password !== confirmPassword}
                type="submit"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </form>
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
