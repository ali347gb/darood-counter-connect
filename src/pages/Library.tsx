
import { useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import LibraryList from "@/components/LibraryList";
import { LibraryItem } from "@/types";
import { mockLibraryItems } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddEditLibraryForm from "@/components/AddEditLibraryForm";
import { useToast } from "@/hooks/use-toast";

const Library = () => {
  const { currentUser } = useAuth();
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>(mockLibraryItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LibraryItem | null>(null);
  const { toast } = useToast();
  
  const isAdmin = currentUser?.role === "admin";

  // Function to handle adding a new library item
  const handleAddItem = (newItem: LibraryItem) => {
    setLibraryItems([newItem, ...libraryItems]);
    setIsAddDialogOpen(false);
    toast({
      title: "Resource Added",
      description: "New resource has been added successfully!",
    });
  };

  // Function to handle editing a library item
  const handleEditItem = (updatedItem: LibraryItem) => {
    setLibraryItems(
      libraryItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
    toast({
      title: "Resource Updated",
      description: "Resource has been updated successfully!",
    });
  };

  // Function to handle deleting a library item
  const handleDeleteItem = (id: string) => {
    setLibraryItems(libraryItems.filter((item) => item.id !== id));
    toast({
      title: "Resource Deleted",
      description: "Resource has been deleted successfully!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white islamic-pattern">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-800">Islamic Library</h1>
            {isAdmin && (
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="mr-1 h-4 w-4" />
                Add New Resource
              </Button>
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
          
          <LibraryList 
            items={libraryItems} 
            isAdmin={isAdmin}
            onEdit={setEditingItem}
            onDelete={handleDeleteItem}
          />
        </div>
      </main>
      
      {/* Dialog for adding new resource */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
          </DialogHeader>
          <AddEditLibraryForm 
            onSubmit={handleAddItem} 
            currentUser={currentUser} 
          />
        </DialogContent>
      </Dialog>

      {/* Dialog for editing resource */}
      <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <AddEditLibraryForm 
              item={editingItem} 
              onSubmit={handleEditItem} 
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

export default Library;
