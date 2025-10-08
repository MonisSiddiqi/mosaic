"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type FileUploadFieldProps<TForm extends FieldValues> = {
  form: UseFormReturn<TForm>;
  name: Path<TForm>;
  accept?: string;
  label?: string;
  description?: string;
};

export function FileUploadField<TForm extends FieldValues>({
  form,
  name,
  accept = "image/*",
  label = "Profile Picture (Optional)",
  description = "Upload your profile picture.",
}: FileUploadFieldProps<TForm>) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div
              onClick={() =>
                inputRef.current ? inputRef.current.click() : null
              }
              className="relative flex w-full cursor-pointer flex-col items-center justify-center border border-dashed border-gray-300 p-1"
            >
              {preview && (
                <Button
                  type="button"
                  size={"sm"}
                  className="absolute right-4 top-1 text-destructive hover:bg-destructive hover:text-white"
                  variant={"outline"}
                  onClick={(e) => {
                    setPreview(null);
                    field.onChange(undefined);
                    e.stopPropagation();
                  }}
                >
                  <XIcon className="size-4" />
                </Button>
              )}

              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-40 border border-gray-200"
                />
              ) : (
                <div className="flex h-40 items-center justify-center gap-2 text-gray-400">
                  <UploadCloudIcon className="size-5" />
                  Upload your picture
                </div>
              )}

              <Input
                type="file"
                className="hidden"
                ref={inputRef}
                accept={accept}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) =>
                      setPreview(ev.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                  field.onChange(file);
                }}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
