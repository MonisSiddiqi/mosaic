"use client";
import { z } from "zod";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

import { useCreateAddressMutation } from "@/queries/users.queries";
import { useAuth } from "@/hooks/use-auth";

import GoogleMapAddressSearchBox from "@/components/google-map-address-search-box";
import { Address } from "@/apis/addresses";

const formSchema = z.object({
  line1: z.string().min(2, "Address Line 1 is required."),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  country: z.string().min(1, "Country is required."),
  postalCode: z.string().min(4, "Postal code is required."),
});

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddAddressForm: FC<Props> = ({ setOpen }) => {
  const { setUser } = useAuth();

  const [address, setAddress] =
    useState<Omit<Address, "id" | "userId" | "createdAt" | "updatedAt">>();

  const mutation = useCreateAddressMutation();

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
        title: "Please select your address",
        variant: "destructive",
      });
      return;
    }

    try {
      const newAddress = await mutation.mutateAsync(address);

      setUser((prevUser) => {
        if (!prevUser) return prevUser;

        return {
          ...prevUser,
          Address: newAddress,
        };
      });

      toast({
        variant: "success",
        title: "Address added successfully",
      });
      setOpen(false);
    } catch (e) {
      toast({
        variant: "destructive",
        title: e instanceof Error ? e.message : "Failed to add address",
      });
    }
  };

  return (
    <div className="z-50 mt-4 grid w-full gap-4">
      <div className="flex flex-col gap-2">
        <p className="ml-1 text-sm">Enter your address</p>
        <GoogleMapAddressSearchBox
          onSelect={(data) => {
            setAddress(data);
          }}
        />
      </div>
      <div className="mt-4 flex w-full justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button disabled={mutation.isPending} onClick={onSubmit} type="button">
          {mutation.isPending ? "Submitting..." : "Submit"}{" "}
        </Button>
      </div>
    </div>
  );
};
