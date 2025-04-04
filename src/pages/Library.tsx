
import { useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import LibraryList from "@/components/LibraryList";
import { LibraryItem } from "@/types";
import { mockLibraryItems } from "@/lib/mock-data";

const Library = () => {
  const { currentUser } = useAuth();
  const [libraryItems] = useState<LibraryItem[]>(mockLibraryItems);
  const isAdmin = currentUser?.email === "admin@example.com";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white islamic-pattern">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-800">Islamic Library</h1>
            {isAdmin && (
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                <span>Add New Resource</span>
              </button>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <p className="text-gray-700 mb-4">
              Welcome to our Islamic Library. Here you can find a collection of books, articles, and resources 
              about Islam, the Prophet Muhammad (PBUH), and the importance of Darood Sharif.
            </p>
            <p className="text-gray-700">
              Feel free to browse, download, and share these resources to spread knowledge about 
              Islamic teachings and practices.
            </p>
          </div>
          
          <LibraryList items={libraryItems} isAdmin={isAdmin} />
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

export default Library;
