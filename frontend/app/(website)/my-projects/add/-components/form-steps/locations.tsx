"use client";

import { Button } from "@/components/ui/button";

import { useAddProject } from "@/hooks/use-add-project";

import GoogleAddressSearchBox from "@/components/google-map-address-search-box";
import { useEffect, useState } from "react";
import { Address } from "@/apis/addresses";
import { toast } from "@/hooks/use-toast";

export const Location = ({}) => {
  const { formData, setFormData, handleNext, handlePrev } = useAddProject();

  const [address, setAddress] =
    useState<Omit<Address, "id" | "userId" | "createdAt" | "updatedAt">>();

  const onSubmit = async () => {
    if (
      !address ||
      !address.line1 ||
      !address.city ||
      !address.state ||
      !address.country ||
      !address.postalCode ||
      !address.lat ||
      !address.lng
    ) {
      toast({
        title: "Please select project location",
        variant: "destructive",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      line1: address?.line1,
      line2: address.line2,
      country: address.country,
      state: address.state,
      city: address.city,
      postalCode: address.postalCode,
      lat: address.lat,
      lng: address.lng,
    }));

    handleNext();
  };

  useEffect(() => {
    setAddress({
      line1: formData?.line1 || "",
      line2: formData?.line2,
      country: formData?.country || "",
      state: formData?.state || "",
      city: formData?.city || "",
      postalCode: formData?.postalCode || "",
      lat: formData?.lat || 0,
      lng: formData?.lng || 0,
    });
  }, []);

  return (
    <div className="mt-4 grid w-full gap-4">
      <div className="flex flex-col gap-2">
        <p className="ml-1 text-sm">Enter your address</p>
        <GoogleAddressSearchBox
          onSelect={(data) => {
            setAddress(data);
          }}
          defaultValue={formData.line1}
        />
      </div>
      <div className="mt-4 flex w-full justify-between">
        <Button type="button" variant="outline" onClick={handlePrev}>
          Previous
        </Button>

        <Button onClick={onSubmit} type="submit">
          Next
        </Button>
      </div>
    </div>
  );
};
