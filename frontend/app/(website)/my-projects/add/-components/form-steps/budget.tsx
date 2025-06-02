import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useAddProjectMutation } from "@/queries/projects.queries";
import { useRouter } from "next/navigation";
import { useAddProject } from "@/hooks/use-add-project";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PlusIcon, RefreshCwIcon, XIcon } from "lucide-react";
import { AddProjectDto } from "@/apis/projects";

const budgetSchema = z.object({
  budgetPreference: z.number(),
  preferenceMessage: z.string().optional(),
  sampleFiles: z.array(z.instanceof(File)).optional(),
});

export const BudgetStep = () => {
  const { formData, handlePrev, setFormData } = useAddProject();

  const [filePreviews, setFilePreviews] = useState<
    { file: File; url: string }[]
  >([]);

  const [selectedValue, setSelectedValue] = useState<number>(0);

  const form = useForm<z.infer<typeof budgetSchema>>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      budgetPreference: undefined,
    },
  });

  const mutation = useAddProjectMutation();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof budgetSchema>) => {
    const updatedFormData = {
      ...formData,
      budgetPreference: values.budgetPreference,
      preferenceMessage: values.preferenceMessage,
      sampleFiles: values.sampleFiles,
    };

    setFormData(updatedFormData);

    try {
      await mutation.mutateAsync(updatedFormData as AddProjectDto);
      toast({
        title: "Project Added Successfully",
        variant: "success",
      });
      router.push("/");
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

    const newPreviews = fileArray.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFilePreviews((prev) => [...prev, ...newPreviews]);
    form.setValue("sampleFiles", [
      ...(form.getValues("sampleFiles") || []),
      ...fileArray,
    ]);
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
            <FormItem className="mt-6 md:w-1/2">
              <FormLabel>Budget Description (Optional)</FormLabel>
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

        <div className="mt-8 flex w-full justify-between">
          <Button type="button" variant="outline" onClick={handlePrev}>
            Previous
          </Button>

          <Button type="submit">
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
