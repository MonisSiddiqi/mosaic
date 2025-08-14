import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useAddProjectMutation } from "@/queries/projects.queries";
import { useRouter } from "next/navigation";
import { useAddProject } from "@/hooks/use-add-project";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PlusIcon, RefreshCwIcon, XIcon } from "lucide-react";
import { AddProjectDto } from "@/apis/projects";
import { FileSizeNote } from "../file-size-note";

const MAX_IMAGE_SIZE = 50 * 1024 * 1024;
const MAX_VIDEO_SIZE = 500 * 1024 * 1024;

const budgetSchema = z.object({
  budgetPreference: z.number(),
  preferenceMessage: z.string().optional(),
  sampleFiles: z.array(z.instanceof(File)).optional(),
});

export const BudgetStep = () => {
  const { formData, handlePrev, setFormData } = useAddProject();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [filePreviews, setFilePreviews] = useState<
    { file: File; url: string }[]
  >([]);

  useEffect(() => {
    if (formData.files?.length) {
      const previews = formData.sampleFiles?.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setFilePreviews(previews || []);
    }

    return () => {
      filePreviews.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, []);

  const [selectedValue, setSelectedValue] = useState<number>(0);

  const form = useForm<z.infer<typeof budgetSchema>>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      budgetPreference: formData.budgetPreference || 5,
      preferenceMessage: formData.preferenceMessage,
      sampleFiles: formData.sampleFiles,
    },
  });

  const mutation = useAddProjectMutation();
  const router = useRouter();

  const handleBack = () => {
    const budgetPreference = form.getValues("budgetPreference");
    const preferenceMessage = form.getValues("preferenceMessage");
    const sampleFiles = form.getValues("sampleFiles");

    const updatedFormData = {
      ...formData,
      budgetPreference,
      preferenceMessage,
      sampleFiles,
    };

    setFormData(updatedFormData);

    handlePrev();
  };

  const onSubmit = async (values: z.infer<typeof budgetSchema>) => {
    const updatedFormData = {
      ...formData,
      budgetPreference: values.budgetPreference,
      preferenceMessage: values.preferenceMessage,
      sampleFiles: values.sampleFiles,
    };

    setFormData(updatedFormData);

    try {
      await mutation.mutateAsync({
        ...updatedFormData,
        tags: updatedFormData.tags?.map((item) => item.value),
      } as AddProjectDto);
      toast({
        title: "Project Added Successfully",
        variant: "success",
      });
      router.push("/my-projects");
    } catch (e) {
      toast({
        title: e instanceof Error ? e.message : "Failed to Add Project",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      const isDuplicate = form
        .getValues("sampleFiles")
        ?.some((item) => item.name === file.name);

      if (isDuplicate) {
        toast({
          title: `File "${file.name}" already uploaded, duplicate files are not allowed`,
          variant: "destructive",
        });
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        return;
      }

      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");

      if (isVideo && file.size > MAX_VIDEO_SIZE) {
        toast({
          title: `Video file ${file.name} exceeds 500MB limit`,
          variant: "destructive",
        });
        return;
      }
      if (isImage && file.size > MAX_IMAGE_SIZE) {
        toast({
          title: `Image file ${file.name} exceeds 50MB limit`,
          variant: "destructive",
        });
        return;
      }
      if (!isVideo && !isImage) {
        toast({
          title: `Invalid file type for ${file.name}. Only images and videos are allowed.`,
          variant: "destructive",
        });
        return;
      }
    }

    const newPreviews = fileArray.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFilePreviews((prev) => [...prev, ...newPreviews]);
    form.setValue("sampleFiles", [
      ...(form.getValues("sampleFiles") || []),
      ...fileArray,
    ]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
    const updatedFiles =
      form.getValues("sampleFiles")?.filter((_, i) => i !== index) || [];
    form.setValue("sampleFiles", updatedFiles);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-4">
          <div>
            <Label className="text-sm font-medium">Budget</Label>

            {/* Slider */}
            <Slider
              defaultValue={[selectedValue]}
              min={0}
              max={10}
              step={1}
              value={[form.watch("budgetPreference")]}
              onValueChange={(value) => {
                const preference = value[0] as number;
                setSelectedValue(preference);
                form.setValue("budgetPreference", preference);
              }}
              className="mt-2 w-full"
            />

            {/* Slider Labels */}
            <div className="mt-4 flex justify-between text-xs font-medium text-gray-600">
              <span>💰 Budget-Friendly</span>
              <span>⚖️ Balanced</span>
              <span>🚀 High Quality</span>
            </div>

            {/* Selected Value Display */}
            <p className="mt-3 text-center text-sm font-medium text-gray-700">
              Selected Value:{" "}
              <span className="text-blue-600">{selectedValue}</span>
            </p>

            {/* Budget Category Indicator */}
            <p className="mt-1 text-center text-sm font-medium">
              {selectedValue < 5
                ? "📉 Budget-Friendly"
                : selectedValue === 5
                  ? "⚖️ Balanced"
                  : "🚀 High Quality"}
            </p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="preferenceMessage"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>Budget Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional details about the budget you would like to share (optional)."
                  {...field}
                  className="h-40"
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Any additional details about the budget that might help us serve
                you better.
              </FormDescription>
            </FormItem>
          )}
        />

        {/* File Upload */}
        <FormField
          control={form.control}
          name="sampleFiles"
          render={() => (
            <FormItem className="mt-6">
              <FormLabel>Upload Sample Files</FormLabel>
              <Input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={(e) => handleFileChange(e.target.files)}
                className="hidden"
                id="file-upload"
                ref={inputRef}
              />
              <div className="mt-3 flex shrink-0 flex-wrap gap-3">
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

                {(form.watch("sampleFiles") || []).length < 20 && (
                  <label
                    htmlFor="file-upload"
                    className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-lg border"
                  >
                    <PlusIcon size={24} className="text-gray-500" />
                  </label>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 text-sm">
          {(form.watch("sampleFiles") || []).length}/20
        </div>

        <FileSizeNote className="mt-7">
          <li>
            Max <span className="font-semibold">20</span> sample files are
            allowed.
          </li>
          <li>Duplicate sample files are not allowed.</li>
        </FileSizeNote>

        <div className="mt-8 flex w-full justify-between">
          <Button
            disabled={mutation.isPending}
            type="button"
            variant="outline"
            onClick={handleBack}
          >
            Previous
          </Button>

          <Button disabled={mutation.isPending} type="submit">
            {mutation.isPending && (
              <RefreshCwIcon className="size-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
