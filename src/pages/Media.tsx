
import { useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import MediaGallery from "@/components/MediaGallery";
import { MediaItem } from "@/types";
import { mockMediaItems } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddEditMediaForm from "@/components/AddEditMediaForm";
import { useToast } from "@/hooks/use-toast";

const Media = () => {
  const { currentUser, isAdmin } = useAuth();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(mockMediaItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const { toast } = useToast();

  // Function to handle adding a new media item
  const handleAddMedia = (newMedia: MediaItem) => {
    setMediaItems([newMedia, ...mediaItems]);
    setIsAddDialogOpen(false);
    toast({
      title: "Media Added",
      description: "New media has been added successfully!",
    });
  };

  // Function to handle editing a media item
  const handleEditMedia = (updatedMedia: MediaItem) => {
    setMediaItems(
      mediaItems.map((item) => (item.id === updatedMedia.id ? updatedMedia : item))
    );
    setEditingMedia(null);
    toast({
      title: "Media Updated",
      description: "Media has been updated successfully!",
    });
  };

  // Function to handle deleting a media item
  const handleDeleteMedia = (id: string) => {
    setMediaItems(mediaItems.filter((item) => item.id !== id));
    toast({
      title: "Media Deleted",
      description: "Media has been deleted successfully!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white islamic-pattern">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-800">Media Gallery</h1>
            {isAdmin && (
              <button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                onClick={() => setIsAddDialogOpen(true)}
              >
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
          
          <MediaGallery 
            items={mediaItems} 
            isAdmin={isAdmin} 
            onEdit={(media) => setEditingMedia(media)}
            onDelete={handleDeleteMedia}
          />
        </div>
      </main>
      
      {/* Dialog for adding new media */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Media</DialogTitle>
          </DialogHeader>
          <AddEditMediaForm onSubmit={handleAddMedia} currentUser={currentUser} />
        </DialogContent>
      </Dialog>

      {/* Dialog for editing media */}
      <Dialog open={!!editingMedia} onOpenChange={(open) => !open && setEditingMedia(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Media</DialogTitle>
          </DialogHeader>
          {editingMedia && (
            <AddEditMediaForm 
              media={editingMedia} 
              onSubmit={handleEditMedia} 
              currentUser={currentUser}
            />
          )}
        </DialogContent>
      </Dialog>
      
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
