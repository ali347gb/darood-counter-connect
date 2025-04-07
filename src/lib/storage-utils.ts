
import { User } from "@/types";

const USER_STORAGE_KEY = "darood-app-user";

export const saveUserToStorage = (user: User): void => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const getUserFromStorage = (): User | null => {
  const savedUser = localStorage.getItem(USER_STORAGE_KEY);
  return savedUser ? JSON.parse(savedUser) : null;
};

export const removeUserFromStorage = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
};
