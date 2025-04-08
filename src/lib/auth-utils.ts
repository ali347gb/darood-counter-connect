
import { User } from "@/types";
import { RegisterParams, ProfileUpdateParams } from "@/types/auth";
import { mockUsers } from "@/lib/mock-data";

export const loginWithGoogleUtil = async (): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockUsers.find(user => user.provider === "google") || mockUsers[0];
};

export const loginWithEmailUtil = async (email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const user = mockUsers.find(u => u.email === email && u.provider === "email");
  
  if (!user) {
    throw new Error("Invalid credentials");
  }
  
  return user;
};

export const loginWithPhoneUtil = async (phoneNumber: string, verificationCode: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const user = mockUsers.find(u => u.phoneNumber === phoneNumber && u.provider === "phone");
  if (!user || verificationCode !== "123456") {
    throw new Error("Invalid credentials");
  }
  return user;
};

export const registerWithEmailUtil = async (params: RegisterParams): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const newUser: User = {
    id: `user-${Date.now()}`,
    name: `${params.firstName} ${params.lastName}`,
    email: params.email,
    provider: "email",
    role: "user",
    photoURL: "",
  };
  
  return newUser;
};

export const updateProfileUtil = async (userId: string, params: ProfileUpdateParams): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would update a database
  // For now, we'll just return a mock updated user
  return {
    id: userId,
    email: "user@example.com",
    name: "User Name",
    role: "user",
    provider: "email",
    whatsappNumber: params.whatsappNumber,
    location: {
      country: params.country,
      city: params.city
    }
  };
};

export const logoutUtil = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
};
