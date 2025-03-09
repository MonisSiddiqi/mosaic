import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider"; // ShadCN Slider
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction, useState } from "react";
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
  const [selectedValue, setSelectedValue] = useState<number>(1);

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
      budgetPreference:
        selectedValue < 6 ? Preference.LOW_PRICE : Preference.HIGH_QUALITY,
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
      <div className="mt-4 grid w-full gap-4">
        <div>
          <Label className="text-sm font-medium">Budget</Label>

          {/* Slider */}
          <Slider
            defaultValue={[selectedValue]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => {
              const preference = value[0] as number;
              setSelectedValue(preference);
              form.setValue(
                "budgetPreference",
                preference < 6 ? Preference.LOW_PRICE : Preference.HIGH_QUALITY,
              );
            }}
            className="mt-2 w-full"
          />

          {/* Slider Labels */}
          <div className="mt-4 flex justify-between text-xs font-medium text-gray-600">
            <span>💰 Budget-Friendly</span>
            <span>🚀 High Quality</span>
          </div>

          {/* Selected Value Display */}
          <p className="mt-3 text-center text-sm font-medium text-gray-700">
            Selected Value:{" "}
            <span className="text-blue-600">{selectedValue}</span>
          </p>

          {/* Budget Category Indicator */}
          <p className="mt-1 text-center text-sm font-medium">
            {selectedValue <= 5 ? "📉 Budget-Friendly" : "🚀 High Quality"}
          </p>
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
