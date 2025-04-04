
import React from "react";
import { useForm } from "react-hook-form";
import { MediaItem, User } from "@/types";
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

interface AddEditMediaFormProps {
  media?: MediaItem;
  onSubmit: (data: MediaItem) => void;
  currentUser: User | null;
}

const AddEditMediaForm: React.FC<AddEditMediaFormProps> = ({
  media,
  onSubmit,
  currentUser,
}) => {
  const isEditMode = !!media;

  // Set up form with default values
  const form = useForm({
    defaultValues: {
      title: media?.title || "",
      description: media?.description || "",
      type: media?.type || "video",
      url: media?.url || "",
      thumbnailUrl: media?.thumbnailUrl || "",
    },
  });

  const handleSubmit = (values: any) => {
    const now = new Date().toISOString();
    const newMedia: MediaItem = {
      id: media?.id || `media-${Date.now()}`,
      title: values.title,
      description: values.description,
      type: values.type as "video" | "image" | "link",
      url: values.url,
      thumbnailUrl: values.thumbnailUrl || "",
      createdAt: media?.createdAt || now,
      createdBy: media?.createdBy || currentUser?.id || "anonymous",
    };

    onSubmit(newMedia);
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
                <Input placeholder="Enter media title" {...field} />
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
                  placeholder="Enter media description"
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
              <FormLabel>Media Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select media type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="link">External Link</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter media URL" {...field} />
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
            {isEditMode ? "Update Media" : "Add Media"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddEditMediaForm;
