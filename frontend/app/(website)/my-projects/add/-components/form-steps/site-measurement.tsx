import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { z } from "zod";
import { AddProjectDto } from "@/apis/projects/projects.type";
import { PlusIcon, XIcon } from "lucide-react";

// Define schema with optional file input
const measurementsSchema = z.object({
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  area: z.string().optional(),
  files: z.array(z.instanceof(File)).optional(),
});

type Props = {
  handlePrevious: () => void;
  handleNext: () => void;
  formData: AddProjectDto;
  setFormData: Dispatch<SetStateAction<AddProjectDto>>;
};

export const SiteMeasurements: FC<Props> = ({
  handlePrevious,
  handleNext,
  formData,
  setFormData,
}) => {
  const [filePreviews, setFilePreviews] = useState<
    { file: File; url: string }[]
  >([]);

  const form = useForm<z.infer<typeof measurementsSchema>>({
    resolver: zodResolver(measurementsSchema),
    defaultValues: {
      length: formData?.length || "",
      width: formData?.width || "",
      height: formData?.height || "",
      area: formData?.area || "",
      files: [],
    },
  });

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);

    const newPreviews = fileArray.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFilePreviews((prev) => [...prev, ...newPreviews]);
    form.setValue("files", [...(form.getValues("files") || []), ...fileArray]);
  };

  const handleRemoveFile = (index: number) => {
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
    const updatedFiles =
      form.getValues("files")?.filter((_, i) => i !== index) || [];
    form.setValue("files", updatedFiles);
  };

  const onSubmit = async (values: z.infer<typeof measurementsSchema>) => {
    setFormData((prev) => ({
      ...prev,
      length: values.length,
      width: values.width,
      height: values.height,
      area: values.area,
      files: values.files,
    }));
    handleNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-4">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length (Meter)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter length (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width (Meter)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter width (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width (Meter)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter width (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area (Meter square)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Area (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* File Upload */}
          <FormField
            control={form.control}
            name="files"
            render={() => (
              <FormItem>
                <FormLabel>Upload Files</FormLabel>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={(e) => handleFileChange(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <div className="mt-3 flex gap-3">
                  {filePreviews.map(({ file, url }, index) => (
                    <div
                      key={index}
                      className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-lg border"
                    >
                      {file.type.startsWith("image/") ? (
                        <img
                          src={url}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <video
                          src={url}
                          controls
                          className="h-full w-full object-cover"
                        />
                      )}
                      <button
                        type="button"
                        className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <XIcon size={12} />
                      </button>
                    </div>
                  ))}
                  <label
                    htmlFor="file-upload"
                    className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-lg border"
                  >
                    <PlusIcon size={24} className="text-gray-500" />
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 flex w-full justify-between">
            <Button type="button" variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
