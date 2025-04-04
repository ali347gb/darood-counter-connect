
import { User, DaroodCount, MediaItem, LibraryItem } from "@/types";

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
