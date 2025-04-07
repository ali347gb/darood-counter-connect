
import { User } from "./index";

export interface RegisterParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  whatsappNumber: string;
  country: string;
  state: string;
  city: string;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phoneNumber: string, verificationCode: string) => Promise<void>;
  registerWithEmail: (params: RegisterParams) => Promise<void>;
  logout: () => Promise<void>;
}
