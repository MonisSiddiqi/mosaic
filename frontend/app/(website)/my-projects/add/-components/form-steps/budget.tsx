import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction } from "react";
import { z } from "zod";
import { AddProjectDto } from "@/apis/projects/projects.type";
import { toast } from "@/hooks/use-toast";
import { useAddProjectMutation } from "@/queries/projects.queries";
import { useRouter } from "next/navigation";

export enum Preference {
  HIGH_QUALITY = "HIGH_QUALITY",
  LOW_PRICE = "LOW_PRICE",
}

const budgetSchema = z.object({
  budgetPreference: z.nativeEnum(Preference).optional(),
});

type Props = {
  handlePrevious: () => void;
  formData: AddProjectDto;
  setFormData: Dispatch<SetStateAction<AddProjectDto>>;
};

export const BudgetStep: FC<Props> = ({
  handlePrevious,
  formData,
  setFormData,
}) => {
  const form = useForm<z.infer<typeof budgetSchema>>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      budgetPreference: undefined,
    },
  });

  const addProjectMutation = useAddProjectMutation();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof budgetSchema>) => {
    setFormData((prev) => ({
      ...prev,
      budgetPreference: values.budgetPreference,
    }));

    try {
      await addProjectMutation.mutateAsync(formData);
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

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mt-4 grid w-full gap-4 md:grid-cols-2">
        <div>
          <Label className="mb-4 text-sm font-medium">
            Budget Preference (Optional)
          </Label>
          <Select
            onValueChange={(value) =>
              form.setValue("budgetPreference", value as Preference)
            }
            defaultValue={form.getValues("budgetPreference")}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select a preference (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Preference.HIGH_QUALITY}>
                High Quality
              </SelectItem>
              <SelectItem value={Preference.LOW_PRICE}>Low Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8 flex w-full justify-between">
        <Button type="button" variant="outline" onClick={handlePrevious}>
          Previous
        </Button>

        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
