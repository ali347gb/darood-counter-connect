
import React from "react";
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
              <FormLabel>File URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter file URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnailUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter thumbnail URL" {...field} />
              </FormControl>
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
