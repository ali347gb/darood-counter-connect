
import React from "react";
import { LibraryItem } from "@/types";
import { Download, Pencil, FileText, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LibraryListProps {
  items: LibraryItem[];
  isAdmin: boolean;
}

const LibraryList: React.FC<LibraryListProps> = ({ items, isAdmin }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-emerald-100 flex items-center justify-center">
            {item.type === "pdf" ? (
              <FileText className="w-16 h-16 text-emerald-700" />
            ) : (
              <div className="w-full h-full">
                <img 
                  src={item.thumbnailUrl || "https://via.placeholder.com/400x300"} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
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
                onClick={() => window.open(item.fileUrl, "_blank")}
              >
                <Download className="mr-1 h-4 w-4" />
                Download
              </Button>
              
              {isAdmin && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-emerald-700 hover:bg-emerald-50"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LibraryList;
