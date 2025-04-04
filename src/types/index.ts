
export interface DaroodCount {
  userId: string;
  count: number;
  date: string; // ISO date string (YYYY-MM-DD)
}

export interface CountSummary {
  daily: number;
  monthly: number;
  annual: number;
  total: number;
}

export interface CommunityStats extends CountSummary {
  usersCount: number;
}

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: "video" | "image" | "link";
  url: string;
  thumbnailUrl?: string;
  createdAt: string; // ISO date string
  createdBy: string; // User ID of creator
}

export interface LibraryItem {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "image";
  fileUrl: string;
  thumbnailUrl?: string;
  createdAt: string; // ISO date string
  createdBy: string; // User ID of creator
}

export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email?: string;
  phoneNumber?: string;
  name: string;
  role: UserRole;
  provider: "email" | "phone" | "google";
  photoURL?: string;
}
