"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  data: { label: string; value: string }[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  fieldName: string;
  placeHolder?: string;
  className?: string;
};

export const Combobox: React.FC<Props> = ({
  data,
  open,
  setOpen,
  value,
  setValue,
  fieldName,
  placeHolder,
  className,
}) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full min-w-[200px] justify-between", className)}
        >
          {value
            ? data.find((item) => item.value === value)?.label
            : placeHolder
              ? placeHolder
              : `Select ${fieldName}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={placeHolder ? placeHolder : `Search ${fieldName}...`}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No {fieldName} found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={(currentLabel) => {
                    const selectedItem = data.find(
                      (item) => item.label === currentLabel,
                    );
                    setValue(
                      value === selectedItem?.value
                        ? ""
                        : (selectedItem?.value ?? ""),
                    );
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
