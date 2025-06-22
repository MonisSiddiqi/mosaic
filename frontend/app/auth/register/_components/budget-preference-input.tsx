"use client";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Dispatch, FC, SetStateAction, useState } from "react";

type Props = {
  selectedValue: number;
  setSelectedValue: (val: number) => void;
  className?: string;
};

export const BudgetPreferenceInput: FC<Props> = ({
  selectedValue,
  setSelectedValue,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <Label className="text-sm font-medium">Budget</Label>

      <Slider
        defaultValue={[selectedValue]}
        min={0}
        max={10}
        step={1}
        onValueChange={(value) => {
          const preference = value[0] as number;
          setSelectedValue(preference);
        }}
        className="mt-2 w-full"
      />

      <div className="mt-4 flex justify-between text-xs font-medium text-gray-600">
        <span>💰 Budget-Friendly</span>
        <span>⚖️ Balanced</span>
        <span>🚀 High Quality</span>
      </div>

      <p className="mt-3 text-center text-sm font-medium text-gray-700">
        Selected Value: <span className="text-blue-600">{selectedValue}</span>
      </p>

      <p className="mt-1 text-center text-sm font-medium">
        {selectedValue < 5
          ? "📉 Budget-Friendly"
          : selectedValue === 5
            ? "⚖️ Balanced"
            : "🚀 High Quality"}
      </p>
    </div>
  );
};
