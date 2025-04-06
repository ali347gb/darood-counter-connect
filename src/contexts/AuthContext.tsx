import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types";
import { mockUsers } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

interface RegisterParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  whatsappNumber: string;
  country: string;
  state: string;
  city: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phoneNumber: string, verificationCode: string) => Promise<void>;
  registerWithEmail: (params: RegisterParams) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check if current user is an admin
  const isAdmin = currentUser?.role === "admin";

  // Simulate checking for user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("darood-app-user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("darood-app-user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("darood-app-user");
    }
  }, [currentUser]);

  // Mock authentication methods
  const loginWithGoogle = async (): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For demo, just use the first mock user
      setCurrentUser(mockUsers.find(user => user.provider === "google") || mockUsers[0]);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Could not authenticate with Google",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = mockUsers.find(u => u.email === email && u.provider === "email");
      
      if (!user) {
        throw new Error("Invalid credentials");
      }
      
      setCurrentUser(user);
      
      // Show different toast for admin vs regular user
      toast({
        title: user.role === "admin" 
          ? "Admin Login Successful" 
          : "Login Successful",
        description: user.role === "admin" 
          ? "Welcome, Administrator" 
          : "Welcome back!",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithPhone = async (phoneNumber: string, verificationCode: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = mockUsers.find(u => u.phoneNumber === phoneNumber && u.provider === "phone");
      if (!user || verificationCode !== "123456") {
        throw new Error("Invalid credentials");
      }
      setCurrentUser(user);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid phone number or verification code",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (params: RegisterParams): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: `${params.firstName} ${params.lastName}`,
        email: params.email,
        phoneNumber: params.whatsappNumber,
        provider: "email",
        role: "user",
        avatar: "",
        country: params.country,
        state: params.state,
        city: params.city,
        created_at: new Date().toISOString(),
      };
      
      setCurrentUser(newUser);
      
      toast({
        title: "Registration Successful",
        description: "Welcome to Markaz-e-Darood!",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Could not create your account",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentUser(null);
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not log out",
        variant: "destructive"
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    isAdmin,
    loginWithGoogle,
    loginWithEmail,
    loginWithPhone,
    registerWithEmail,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
