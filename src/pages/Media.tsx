
import { useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import MediaGallery from "@/components/MediaGallery";
import { MediaItem } from "@/types";
import { mockMediaItems } from "@/lib/mock-data";

const Media = () => {
  const { currentUser } = useAuth();
  const [mediaItems] = useState<MediaItem[]>(mockMediaItems);
  const isAdmin = currentUser?.email === "admin@example.com";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white islamic-pattern">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-800">Media Gallery</h1>
            {isAdmin && (
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                <span>Add New Media</span>
              </button>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <p className="text-gray-700 mb-4">
              Explore our collection of videos, images, and audio about Islamic teachings, 
              the importance of Darood, and other Islamic topics.
            </p>
            <p className="text-gray-700">
              These resources are curated to help deepen your understanding and strengthen your 
              connection with the teachings of Prophet Muhammad (PBUH).
            </p>
          </div>
          
          <MediaGallery items={mediaItems} isAdmin={isAdmin} />
        </div>
      </main>
      
      <footer className="bg-emerald-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Darood Counter. All rights reserved.</p>
          <p className="text-emerald-200 text-sm mt-2">
            Designed with love for the Muslim Ummah.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Media;
