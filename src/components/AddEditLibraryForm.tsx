
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LibraryItem, User } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Upload, FileText, FileImage } from "lucide-react";

interface AddEditLibraryFormProps {
  item?: LibraryItem;
  onSubmit: (data: LibraryItem) => void;
  currentUser: User | null;
}

const AddEditLibraryForm: React.FC<AddEditLibraryFormProps> = ({
  item,
  onSubmit,
  currentUser,
}) => {
  const isEditMode = !!item;
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedThumbnail, setUploadedThumbnail] = useState<File | null>(null);

  // Set up form with default values
  const form = useForm({
    defaultValues: {
      title: item?.title || "",
      description: item?.description || "",
      type: item?.type || "pdf",
      fileUrl: item?.fileUrl || "",
      thumbnailUrl: item?.thumbnailUrl || "",
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isThumb = false) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // In a real application, we would upload the file to a server
      // For now, we create a local blob URL for demonstration
      const blobUrl = URL.createObjectURL(file);
      
      if (isThumb) {
        setUploadedThumbnail(file);
        form.setValue("thumbnailUrl", blobUrl);
      } else {
        setUploadedFile(file);
        form.setValue("fileUrl", blobUrl);
      }
    }
  };

  const handleSubmit = (values: any) => {
    const now = new Date().toISOString();
    const newItem: LibraryItem = {
      id: item?.id || `library-${Date.now()}`,
      title: values.title,
      description: values.description,
      type: values.type as "pdf" | "image",
      fileUrl: values.fileUrl,
      thumbnailUrl: values.thumbnailUrl || "",
      createdAt: item?.createdAt || now,
      createdBy: item?.createdBy || currentUser?.id || "anonymous",
    };

    onSubmit(newItem);
  };

  const resourceType = form.watch("type");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter resource title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter resource description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resource Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resource File</FormLabel>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <Input {...field} placeholder="Enter file URL" />
                  </FormControl>
                  <span className="text-sm text-gray-500">or</span>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-1">
                    <label htmlFor="file-upload" className="flex justify-center items-center p-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="space-y-1 text-center">
                        {resourceType === "pdf" ? (
                          <FileText className="mx-auto h-8 w-8 text-emerald-600" />
                        ) : (
                          <FileImage className="mx-auto h-8 w-8 text-emerald-600" />
                        )}
                        <div className="flex text-sm text-gray-600">
                          <Upload className="h-4 w-4 mr-1" />
                          <span>Upload a {resourceType === "pdf" ? "PDF" : "image"}</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Click to browse or drag and drop
                        </p>
                      </div>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only"
                        accept={resourceType === "pdf" ? ".pdf" : "image/*"}
                        onChange={(e) => handleFileUpload(e)} 
                      />
                    </label>
                  </div>
                </div>
                
                {uploadedFile && (
                  <div className="text-sm text-emerald-600 flex items-center">
                    {resourceType === "pdf" ? <FileText className="h-4 w-4 mr-1" /> : <FileImage className="h-4 w-4 mr-1" />}
                    <span>Uploaded: {uploadedFile.name}</span>
                  </div>
                )}
              </div>
              <FormDescription>
                Either enter a URL or upload a file from your computer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnailUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail (Optional)</FormLabel>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <Input {...field} placeholder="Enter thumbnail URL" />
                  </FormControl>
                  <span className="text-sm text-gray-500">or</span>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-1">
                    <label htmlFor="thumbnail-upload" className="flex justify-center items-center p-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="space-y-1 text-center">
                        <FileImage className="mx-auto h-8 w-8 text-emerald-600" />
                        <div className="flex text-sm text-gray-600">
                          <Upload className="h-4 w-4 mr-1" />
                          <span>Upload a thumbnail image</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Click to browse or drag and drop
                        </p>
                      </div>
                      <input 
                        id="thumbnail-upload" 
                        name="thumbnail-upload" 
                        type="file" 
                        className="sr-only" 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, true)} 
                      />
                    </label>
                  </div>
                </div>
                
                {uploadedThumbnail && (
                  <div className="text-sm text-emerald-600 flex items-center">
                    <FileImage className="h-4 w-4 mr-1" />
                    <span>Uploaded: {uploadedThumbnail.name}</span>
                  </div>
                )}
              </div>
              <FormDescription>
                Either enter a URL or upload an image from your computer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="pt-4">
          <Button type="submit">
            {isEditMode ? "Update Resource" : "Add Resource"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddEditLibraryForm;
