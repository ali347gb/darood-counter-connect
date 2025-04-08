
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Mail } from "lucide-react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithGoogle, loginWithEmail, loading } = useAuth();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await loginWithEmail(email, password);
    } catch (error) {
      console.error("Email login error:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Login to track your Darood-e-Pak recitations
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
              Continue with email
            </span>
          </div>
        </div>
        
        <form onSubmit={handleEmailLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
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
            
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={loading || !email || !password}
              type="submit"
            >
              {loading ? "Logging in..." : "Sign In"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="/signup" className="text-emerald-600 hover:underline">
            Sign up
          </a>
        </p>
        <p className="text-xs text-muted-foreground">
          For demo, use email: user3@example.com with any password
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
