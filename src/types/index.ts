
export interface User {
  id: string;
  email?: string;
  phoneNumber?: string;
  name?: string;
  photoURL?: string;
  provider: 'google' | 'email' | 'phone';
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
