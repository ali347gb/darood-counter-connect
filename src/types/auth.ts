
import { User } from "./index";

export interface RegisterParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ProfileUpdateParams {
  whatsappNumber?: string;
  country?: string;
  city?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (params: RegisterParams) => Promise<void>;
  updateProfile: (params: ProfileUpdateParams) => Promise<void>;
  logout: () => Promise<void>;
}
