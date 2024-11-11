"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { PlusIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/ui/file-upload";
import { getPresignedUrl } from "@/actions/file-upload";
import { createTrack } from "@/actions/tracks";

const MAX_METADATA_ENTRIES = 20;

// Track schema based on DB schema
const metadataSchema = z.object({
  measurement: z.string().optional(),
  value: z.string().optional(),
});

const trackSchema = z.object({
  note: z.string().min(1, "Note is required"),
  image: z.string().optional(),
  metadata: z.array(metadataSchema).max(MAX_METADATA_ENTRIES),
});

interface TrackFormProps {
  projectId: string;
  setOpen: (open: boolean) => void;
}

const STORAGE_KEY = "track-form-data";

const TrackForm = ({ projectId, setOpen }: TrackFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved form data from localStorage
  const savedData =
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  const parsedData = savedData ? JSON.parse(savedData) : null;

  const form = useForm<z.infer<typeof trackSchema>>({
    resolver: zodResolver(trackSchema),
    defaultValues: parsedData || {
      note: "",
      metadata: [{ measurement: "", value: "" }],
    },
  });

  const metadata = form.watch("metadata");
  const formValues = form.watch();
  const image = form.watch("image");
  // Save form data to localStorage whenever it changes

  useEffect(() => {
    console.log("Image changed", image);
  }, [image]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
  }, [formValues]);

  const addMetadata = () => {
    if (metadata.length < MAX_METADATA_ENTRIES) {
      form.setValue("metadata", [...metadata, { measurement: "", value: "" }]);
    }
  };

  const removeMetadata = (index: number) => {
    if (metadata.length > 1) {
      const newMetadata = metadata.filter((_, i) => i !== index);
      form.setValue("metadata", newMetadata);
    }
  };

  async function handleImageUpload(file: File) {
    const uploadUrl = await getPresignedUrl({
      size: file.size,
      type: file.type,
    });

    if (!uploadUrl.signedUrl) {
      throw new Error("Failed to get upload URL");
    }

    await fetch(uploadUrl.signedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    return uploadUrl.key;
  }

  async function onSubmit(values: z.infer<typeof trackSchema>) {
    try {
      setIsLoading(true);

      let imageKey;
      if (imageFile) {
        imageKey = await handleImageUpload(imageFile);
      }

      const result = await createTrack({
        ...values,
        image: imageKey,
        projectId,
      });

      if ("error" in result) {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "Failed to create track"
        );
      }

      // Clear stored data and form after successful submission
      localStorage.removeItem(STORAGE_KEY);
      form.reset({
        note: "",
        metadata: [{ measurement: "", value: "" }],
      });
      setImageFile(null);
      setOpen(false);
    } catch (error) {
      console.error("Failed to create track:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write about your progress..."
                  {...field}
                  className="min-h-[100px] text-base"
                />
              </FormControl>
              <FormDescription>
                Add notes about your progress for this track.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          {metadata.map((_, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="grid flex-1 grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`metadata.${index}.measurement`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Measurement Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Weight, Distance"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>What are you measuring?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`metadata.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 65kg, 5km" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the measurement value
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {metadata.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-8"
                  onClick={() => removeMetadata(index)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          {metadata.length < MAX_METADATA_ENTRIES && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addMetadata}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Another Measurement
            </Button>
          )}
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileUpload
                  isLoading={isLoading}
                  onFileChange={field.onChange}
                  setCoverFile={setImageFile}
                  previewHeight={600}
                  placeholder={{
                    text: "Add an image to your track",
                  }}
                />
              </FormControl>
              <FormDescription>
                Upload an image to show your progress.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default TrackForm;
