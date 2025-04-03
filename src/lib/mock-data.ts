
import { User, DaroodCount, CountSummary, CommunityStats } from "@/types";

// Mock users
export const mockUsers: User[] = [
  {
    id: "user1",
    email: "user1@example.com",
    name: "Ahmed Khan",
    photoURL: "https://i.pravatar.cc/150?img=1",
    provider: "google"
  },
  {
    id: "user2",
    phoneNumber: "+921234567890",
    name: "Fatima Ali",
    provider: "phone"
  },
  {
    id: "user3",
    email: "user3@example.com",
    name: "Muhammad Usman",
    provider: "email"
  }
];

// Current date for calculations
const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

// Generate mock darood counts for last 365 days
export const generateMockCounts = (userId: string): DaroodCount[] => {
  const counts: DaroodCount[] = [];
  
  for (let i = 0; i < 365; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    counts.push({
      userId,
      count: Math.floor(Math.random() * 500) + 100, // Random count between 100-600
      date: date.toISOString().split('T')[0]
    });
  }
  
  return counts;
};

// Calculate summary for a user
export const calculateUserSummary = (counts: DaroodCount[]): CountSummary => {
  const today = new Date().toISOString().split('T')[0];
  
  // Filter by time periods
  const dailyCount = counts.find(c => c.date === today)?.count || 0;
  
  const thisMonth = counts.filter(c => {
    const date = new Date(c.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  }).reduce((sum, c) => sum + c.count, 0);
  
  const thisYear = counts.filter(c => {
    const date = new Date(c.date);
    return date.getFullYear() === currentYear;
  }).reduce((sum, c) => sum + c.count, 0);
  
  const total = counts.reduce((sum, c) => sum + c.count, 0);
  
  return {
    daily: dailyCount,
    monthly: thisMonth,
    annual: thisYear,
    total
  };
};

// Calculate community stats
export const calculateCommunityStats = (): CommunityStats => {
  let dailyTotal = 0;
  let monthlyTotal = 0;
  let annualTotal = 0;
  let grandTotal = 0;
  
  mockUsers.forEach(user => {
    const counts = generateMockCounts(user.id);
    const summary = calculateUserSummary(counts);
    
    dailyTotal += summary.daily;
    monthlyTotal += summary.monthly;
    annualTotal += summary.annual;
    grandTotal += summary.total;
  });
  
  return {
    daily: dailyTotal,
    monthly: monthlyTotal,
    annual: annualTotal,
    total: grandTotal,
    usersCount: mockUsers.length
  };
};
