import { Input } from "@/components/ui/input";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { PlusIcon, XIcon } from "lucide-react";
import { useAddProject } from "@/hooks/use-add-project";
import { Unit } from "@/apis/projects/projects.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const measurementsSchema = z.object({
  unit: z.enum([Unit.FEET, Unit.METER, Unit.YARD]),
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  area: z.string().optional(),
  files: z.array(z.instanceof(File)).optional(),
  siteDescription: z.string().optional(),
});

export const SiteMeasurements = () => {
  const { formData, handlePrev, handleNext, setFormData } = useAddProject();

  const [filePreviews, setFilePreviews] = useState<
    { file: File; url: string }[]
  >([]);

  const form = useForm<z.infer<typeof measurementsSchema>>({
    resolver: zodResolver(measurementsSchema),
    defaultValues: {
      unit: formData.unit || Unit.METER,
      length: formData?.length || "",
      width: formData?.width || "",
      height: formData?.height || "",
      area: formData?.area || "",
      siteDescription: formData?.siteDescription || "",
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
      siteDescription: values.siteDescription,
    }));
    handleNext();
  };

  const unit = form
    .watch("unit")
    ?.toLowerCase()
    .replace(/^./, (char) => char.toUpperCase());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-4">
          <div className="grid gap-7 md:grid-cols-2">
            <div className="col-span-2 grid grid-cols-2 gap-7">
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Measurement Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select measurement unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Unit).map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the unit in which you have measured your site
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length ({unit})</FormLabel>
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
                  <FormLabel>Width ({unit})</FormLabel>
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
                  <FormLabel>Width ({unit})</FormLabel>
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
                  <FormLabel>Area (Square {unit})</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Area (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="siteDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your site (optional)"
                      {...field}
                      className="h-32"
                    />
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
            <Button type="button" variant="outline" onClick={handlePrev}>
              Previous
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
