"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";

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
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import ProjectDateSelector from "./project-date-selector";
import { createProject } from "@/actions/projects";
import { getPresignedUrl } from "@/actions/file-upload";
import { projectSchema } from "@/schemas/projects";
import FileUpload from "../ui/file-upload";
import { Category } from "@/db/schema";

interface ProjectFormProps {
  setOpen: (open: boolean) => void;
}

const FREQUENCIES = [
  { value: "3600", label: "Hourly" },
  { value: "86400", label: "Daily" },
  { value: "604800", label: "Weekly" },
  { value: "2592000", label: "Monthly" },
] as const;

const STORAGE_KEY = "project-form-data";

const ProjectForm = ({ setOpen }: ProjectFormProps) => {
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsCategoriesLoading(true);
        setCategoriesError(null);
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoriesError(
          "Failed to load categories. Please try again later."
        );
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Load saved form data from localStorage
  const savedData =
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  const parsedData = savedData ? JSON.parse(savedData) : null;

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: parsedData || {
      title: "",
    },
  });

  const formValues = form.watch();

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
  }, [formValues]);

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

  async function onSubmit(values: z.infer<typeof projectSchema>) {
    if (!coverFile) return;

    try {
      setIsLoading(true);
      const imageKey = await handleImageUpload(coverFile);
      const projectData = { ...values, coverImage: imageKey };
      await createProject(projectData);
      // Clear stored data and form after successful submission
      localStorage.removeItem(STORAGE_KEY);
      form.reset({
        title: "",
      });
      setCoverFile(null);
      setOpen(false);
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="I'm going to build muscle"
                  {...field}
                  className="text-base"
                />
              </FormControl>
              <FormDescription>Add a title to your challenge.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Select a frequency"
                      className="text-base"
                    />
                  </SelectTrigger>
                  <SelectContent className="text-base">
                    {FREQUENCIES.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                How often do you want to do this challenge?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isCategoriesLoading || !!categoriesError}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        isCategoriesLoading
                          ? "Loading categories..."
                          : categoriesError
                          ? "Error loading categories"
                          : "Select a category"
                      }
                      className="text-base"
                    />
                  </SelectTrigger>
                  <SelectContent className="text-base">
                    {categories.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                {categoriesError ? (
                  <span className="text-destructive">{categoriesError}</span>
                ) : (
                  "What category does this challenge fall under?"
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Challenge End Date</FormLabel>
              <FormControl>
                <ProjectDateSelector
                  onChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormDescription>
                When do you want to end this challenge?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <FileUpload
                  isLoading={isLoading}
                  onFileChange={field.onChange}
                  setCoverFile={setCoverFile}
                />
              </FormControl>
              <FormDescription>
                Add a cover image to your challenge.
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

export default ProjectForm;
