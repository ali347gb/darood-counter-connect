
import React, { createContext, useState, useContext, useEffect } from "react";
import { DaroodCount, CountSummary, CommunityStats } from "@/types";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";
import { generateMockCounts, calculateUserSummary, calculateCommunityStats } from "@/lib/mock-data";

interface CounterContextType {
  userCounts: DaroodCount[];
  userSummary: CountSummary;
  communityStats: CommunityStats;
  incrementCount: () => Promise<void>;
  isLoading: boolean;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const [userCounts, setUserCounts] = useState<DaroodCount[]>([]);
  const [userSummary, setUserSummary] = useState<CountSummary>({
    daily: 0,
    monthly: 0,
    annual: 0,
    total: 0
  });
  const [communityStats, setCommunityStats] = useState<CommunityStats>({
    daily: 0,
    monthly: 0,
    annual: 0,
    total: 0,
    usersCount: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load user counts and community stats when user changes
  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        try {
          // Get mock data for the current user
          const counts = generateMockCounts(currentUser.id);
          setUserCounts(counts);
          
          // Calculate user summary
          const summary = calculateUserSummary(counts);
          setUserSummary(summary);
          
          // Get community stats
          const stats = calculateCommunityStats();
          setCommunityStats(stats);
        } catch (error) {
          toast({
            title: "Error",
            description: "Could not load count data",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }, 800);
    } else {
      // If no user, still load community stats
      try {
        const stats = calculateCommunityStats();
        setCommunityStats(stats);
      } catch (error) {
        console.error("Error loading community stats:", error);
      }
    }
  }, [currentUser, toast]);

  // Increment count function
  const incrementCount = async (): Promise<void> => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to count Darood",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get today's date
      const today = new Date().toISOString().split('T')[0];
      
      // Create updated counts
      const updatedCounts = [...userCounts];
      const todayIndex = updatedCounts.findIndex(count => count.date === today);
      
      if (todayIndex !== -1) {
        // Update existing count
        updatedCounts[todayIndex] = {
          ...updatedCounts[todayIndex],
          count: updatedCounts[todayIndex].count + 1
        };
      } else {
        // Add new count for today
        updatedCounts.push({
          userId: currentUser.id,
          date: today,
          count: 1
        });
      }
      
      // Update state
      setUserCounts(updatedCounts);
      
      // Recalculate user summary
      const newSummary = calculateUserSummary(updatedCounts);
      setUserSummary(newSummary);
      
      // Update community stats (increment daily count)
      setCommunityStats(prev => ({
        ...prev,
        daily: prev.daily + 1,
        monthly: prev.monthly + 1,
        annual: prev.annual + 1,
        total: prev.total + 1
      }));

      // Silent success - no toast for each increment to avoid spamming
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update count",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    userCounts,
    userSummary,
    communityStats,
    incrementCount,
    isLoading
  };

  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>;
};

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};
