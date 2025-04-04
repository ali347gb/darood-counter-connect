import { User, DaroodCount, MediaItem, LibraryItem, CountSummary, CommunityStats } from "@/types";

// Mock users
export const mockUsers: User[] = [
  {
    id: "user1",
    email: "user@example.com",
    name: "Regular User",
    provider: "email",
    role: "user"
  },
  {
    id: "user2",
    email: "admin@example.com",
    name: "Admin User",
    provider: "email",
    role: "admin"
  },
  {
    id: "user3",
    phoneNumber: "+15551234567",
    name: "Phone User",
    provider: "phone",
    role: "user"
  },
  {
    id: "user4",
    email: "google@example.com",
    name: "Google User",
    photoURL: "https://via.placeholder.com/150",
    provider: "google",
    role: "user"
  }
];

// Mock count data
export const mockCounts: DaroodCount[] = [
  { userId: "user1", count: 100, date: "2023-04-01" },
  { userId: "user1", count: 150, date: "2023-04-02" },
  { userId: "user1", count: 200, date: "2023-04-03" },
  { userId: "user2", count: 300, date: "2023-04-01" },
  { userId: "user2", count: 350, date: "2023-04-02" },
  { userId: "user3", count: 400, date: "2023-04-01" }
];

// Mock media items
export const mockMediaItems: MediaItem[] = [
  {
    id: "media1",
    title: "The Importance of Darood",
    description: "A video explaining the virtues and rewards of reciting Darood Sharif regularly.",
    type: "video",
    url: "https://www.youtube.com/watch?v=example1",
    thumbnailUrl: "https://via.placeholder.com/400x300/97cfb5/ffffff?text=Darood+Video",
    createdAt: "2023-03-15",
    createdBy: "admin"
  },
  {
    id: "media2",
    title: "Islamic Calligraphy",
    description: "Beautiful Islamic calligraphy featuring Darood Sharif.",
    type: "image",
    url: "https://via.placeholder.com/1200x800/97cfb5/ffffff?text=Calligraphy",
    thumbnailUrl: "https://via.placeholder.com/400x300/97cfb5/ffffff?text=Calligraphy",
    createdAt: "2023-02-20",
    createdBy: "admin"
  },
  {
    id: "media3",
    title: "Scholarly Discussion on Darood",
    description: "A link to a scholarly article discussing the various forms of Darood and their significance.",
    type: "link",
    url: "https://example.com/scholarly-article",
    thumbnailUrl: "https://via.placeholder.com/400x300/97cfb5/ffffff?text=Scholarly+Article",
    createdAt: "2023-01-10",
    createdBy: "admin"
  },
  {
    id: "media4",
    title: "Recitation by Sheikh Abdullah",
    description: "A beautiful recitation of Darood Ibrahim by Sheikh Abdullah.",
    type: "video",
    url: "https://www.youtube.com/watch?v=example2",
    thumbnailUrl: "https://via.placeholder.com/400x300/97cfb5/ffffff?text=Recitation",
    createdAt: "2023-04-05",
    createdBy: "admin"
  },
  {
    id: "media5",
    title: "Islamic Architecture",
    description: "Images of beautiful Islamic architecture from around the world.",
    type: "image",
    url: "https://via.placeholder.com/1200x800/97cfb5/ffffff?text=Architecture",
    thumbnailUrl: "https://via.placeholder.com/400x300/97cfb5/ffffff?text=Architecture",
    createdAt: "2023-03-25",
    createdBy: "admin"
  },
  {
    id: "media6",
    title: "Online Islamic Course",
    description: "Link to an online course about Islamic studies and the importance of Darood.",
    type: "link",
    url: "https://example.com/online-course",
    thumbnailUrl: "https://via.placeholder.com/400x300/97cfb5/ffffff?text=Online+Course",
    createdAt: "2023-02-15",
    createdBy: "admin"
  }
];

// Mock library items
export const mockLibraryItems: LibraryItem[] = [
  {
    id: "lib1",
    title: "The Virtues of Darood",
    description: "A comprehensive guide to understanding the importance and benefits of reciting Darood.",
    type: "pdf",
    fileUrl: "https://example.com/virtues-of-darood.pdf",
    createdAt: "2023-04-10",
    createdBy: "admin"
  },
  {
    id: "lib2",
    title: "Islamic Prayers Collection",
    description: "A collection of various Islamic prayers including different forms of Darood.",
    type: "pdf",
    fileUrl: "https://example.com/islamic-prayers.pdf",
    createdAt: "2023-03-20",
    createdBy: "admin"
  },
  {
    id: "lib3",
    title: "Darood in Calligraphy",
    description: "Beautiful calligraphy images of various Darood texts for educational purposes.",
    type: "image",
    fileUrl: "https://via.placeholder.com/1200x800/97cfb5/ffffff?text=Darood+Calligraphy",
    thumbnailUrl: "https://via.placeholder.com/400x300/97cfb5/ffffff?text=Darood+Calligraphy",
    createdAt: "2023-02-25",
    createdBy: "admin"
  },
  {
    id: "lib4",
    title: "History of Darood",
    description: "An academic paper on the historical development and significance of Darood in Islamic tradition.",
    type: "pdf",
    fileUrl: "https://example.com/history-of-darood.pdf",
    createdAt: "2023-01-15",
    createdBy: "admin"
  },
  {
    id: "lib5",
    title: "Islamic Manuscripts",
    description: "Historical Islamic manuscripts featuring Darood texts from different eras.",
    type: "image",
    fileUrl: "https://via.placeholder.com/1200x800/97cfb5/ffffff?text=Islamic+Manuscripts",
    thumbnailUrl: "https://via.placeholder.com/400x300/97cfb5/ffffff?text=Islamic+Manuscripts",
    createdAt: "2023-03-05",
    createdBy: "admin"
  },
  {
    id: "lib6",
    title: "Modern Guide to Darood",
    description: "A contemporary guide to understanding and incorporating Darood in daily life.",
    type: "pdf",
    fileUrl: "https://example.com/modern-guide-darood.pdf",
    createdAt: "2023-04-15",
    createdBy: "admin"
  }
];

/**
 * Generates mock count data for a specific user
 * @param userId The user ID to generate counts for
 * @returns Array of DaroodCount objects
 */
export const generateMockCounts = (userId: string): DaroodCount[] => {
  // Filter existing mock counts for this user
  const userCounts = mockCounts.filter(count => count.userId === userId);
  
  // If we have counts for this user, return them
  if (userCounts.length > 0) {
    return userCounts;
  }
  
  // Otherwise, generate some default counts for new users
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  return [
    { userId, count: 10, date: yesterday },
    { userId, count: 15, date: today }
  ];
};

/**
 * Calculates summary statistics for a user's counts
 * @param counts Array of user count objects
 * @returns CountSummary object with daily, monthly, annual and total stats
 */
export const calculateUserSummary = (counts: DaroodCount[]): CountSummary => {
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = today.substring(0, 7); // YYYY-MM format
  const currentYear = today.substring(0, 4); // YYYY format
  
  const summary: CountSummary = {
    daily: 0,
    monthly: 0,
    annual: 0,
    total: 0
  };
  
  // Calculate each metric
  counts.forEach(count => {
    // Add to total count
    summary.total += count.count;
    
    // Add to daily count if it's today
    if (count.date === today) {
      summary.daily += count.count;
    }
    
    // Add to monthly count if it's this month
    if (count.date.startsWith(currentMonth)) {
      summary.monthly += count.count;
    }
    
    // Add to annual count if it's this year
    if (count.date.startsWith(currentYear)) {
      summary.annual += count.count;
    }
  });
  
  return summary;
};

/**
 * Calculates community-wide statistics
 * @returns CommunityStats object with community-wide metrics
 */
export const calculateCommunityStats = (): CommunityStats => {
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = today.substring(0, 7); // YYYY-MM format
  const currentYear = today.substring(0, 4); // YYYY format
  
  const stats: CommunityStats = {
    daily: 0,
    monthly: 0,
    annual: 0,
    total: 0,
    usersCount: mockUsers.length // Total number of users
  };
  
  // Calculate community-wide metrics from all counts
  mockCounts.forEach(count => {
    // Add to total count
    stats.total += count.count;
    
    // Add to daily count if it's today
    if (count.date === today) {
      stats.daily += count.count;
    }
    
    // Add to monthly count if it's this month
    if (count.date.startsWith(currentMonth)) {
      stats.monthly += count.count;
    }
    
    // Add to annual count if it's this year
    if (count.date.startsWith(currentYear)) {
      stats.annual += count.count;
    }
  });
  
  // Add some random counts to make the stats more interesting
  stats.daily += 750;
  stats.monthly += 22500;
  stats.annual += 185000;
  stats.total += 958000;
  stats.usersCount += 120; // Additional mock users beyond our sample
  
  return stats;
};
