
import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types";
import { AuthContextType, RegisterParams, ProfileUpdateParams } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { 
  loginWithGoogleUtil, 
  loginWithEmailUtil,
  registerWithEmailUtil,
  logoutUtil
} from "@/lib/auth-utils";
import {
  saveUserToStorage,
  getUserFromStorage,
  removeUserFromStorage
} from "@/lib/storage-utils";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    const savedUser = getUserFromStorage();
    if (savedUser) {
      setCurrentUser(savedUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (currentUser) {
      saveUserToStorage(currentUser);
    } else {
      removeUserFromStorage();
    }
  }, [currentUser]);

  const loginWithGoogle = async (): Promise<void> => {
    setLoading(true);
    try {
      const user = await loginWithGoogleUtil();
      setCurrentUser(user);
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
      const user = await loginWithEmailUtil(email, password);
      setCurrentUser(user);
      
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

  const registerWithEmail = async (params: RegisterParams): Promise<void> => {
    setLoading(true);
    try {
      const newUser = await registerWithEmailUtil(params);
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

  const updateProfile = async (params: ProfileUpdateParams): Promise<void> => {
    setLoading(true);
    try {
      // In a real app, this would call an API endpoint
      // For now, we'll just update the local state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (currentUser) {
        const updatedUser: User = {
          ...currentUser,
          whatsappNumber: params.whatsappNumber || currentUser.whatsappNumber,
          location: {
            country: params.country || currentUser.location?.country || '',
            city: params.city || currentUser.location?.city || ''
          }
        };
        
        setCurrentUser(updatedUser);
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not update your profile",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutUtil();
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
    registerWithEmail,
    updateProfile,
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
