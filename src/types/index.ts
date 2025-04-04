
export interface User {
  id: string;
  email?: string;
  phoneNumber?: string;
  name?: string;
  photoURL?: string;
  provider: 'google' | 'email' | 'phone';
  role?: 'user' | 'admin';
}

export interface DaroodCount {
  userId: string;
  count: number;
  date: string; // ISO date string
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
  type: 'image' | 'video' | 'link';
  url: string;
  thumbnailUrl?: string;
  createdAt: string;
  createdBy: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'image';
  fileUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
  createdBy: string;
}
