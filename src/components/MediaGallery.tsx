
import React, { useState } from "react";
import { MediaItem } from "@/types";
import { Pencil, Play, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MediaGalleryProps {
  items: MediaItem[];
  isAdmin: boolean;
  onEdit?: (media: MediaItem) => void;
  onDelete?: (id: string) => void;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ 
  items, 
  isAdmin, 
  onEdit, 
  onDelete 
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [mediaToDelete, setMediaToDelete] = useState<MediaItem | null>(null);
  
  const filteredItems = activeTab === "all" 
    ? items 
    : items.filter(item => item.type === activeTab);

  const handleDeleteClick = (media: MediaItem) => {
    setMediaToDelete(media);
  };

  const confirmDelete = () => {
    if (mediaToDelete && onDelete) {
      onDelete(mediaToDelete.id);
      setMediaToDelete(null);
    }
  };

  return (
    <div>
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-white">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="link">External Links</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-emerald-100 relative">
              <img 
                src={item.thumbnailUrl || "https://via.placeholder.com/400x300"} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="bg-white bg-opacity-80 rounded-full p-3">
                    <Play className="w-8 h-8 text-emerald-700" />
                  </div>
                </div>
              )}
              
              {item.type === "link" && (
                <div className="absolute top-2 right-2">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {item.description.length > 100 
                  ? `${item.description.substring(0, 100)}...` 
                  : item.description}
              </p>
              
              <div className="flex justify-between items-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                  onClick={() => {
                    if (item.type === "link") {
                      window.open(item.url, "_blank");
                    } else if (item.type === "video") {
                      window.open(item.url, "_blank");
                    } else {
                      window.open(item.url, "_blank");
                    }
                  }}
                >
                  {item.type === "link" ? "Visit Link" : "View"}
                </Button>
                
                {isAdmin && (
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-emerald-700 hover:bg-emerald-50"
                      onClick={() => onEdit && onEdit(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteClick(item)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!mediaToDelete} onOpenChange={(open) => !open && setMediaToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the media item 
              "{mediaToDelete?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MediaGallery;
