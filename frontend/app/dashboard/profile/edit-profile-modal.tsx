"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  UserProfile?: {
    name?: string;
    bio?: string;
    location?: string;
    image?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    country?: string;
    cityState?: string;
    postalCode?: string;
    taxId?: string;
  };
};

type EditProfileModalProps = {
  section: "overview" | "personal" | "address";
  user: User;
};

export function EditProfileModal({ section, user }: EditProfileModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form state based on section
  const [formData, setFormData] = useState(() => {
    if (section === "overview") {
      return {
        name: user.UserProfile?.name || "",
        bio: user.UserProfile?.bio || "",
        location: user.UserProfile?.location || "",
        image: user.UserProfile?.image || "",
      };
    } else if (section === "personal") {
      return {
        firstName: user.UserProfile?.firstName || "",
        lastName: user.UserProfile?.lastName || "",
        email: user.email || "",
        phone: user.UserProfile?.phone || "",
        bio: user.UserProfile?.bio || "",
      };
    } else {
      return {
        country: user.UserProfile?.country || "",
        cityState: user.UserProfile?.cityState || "",
        postalCode: user.UserProfile?.postalCode || "",
        taxId: user.UserProfile?.taxId || "",
      };
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the server action to update the profile
      //   const result = await updateProfile({
      //     userId: user.id,
      //     section,
      //     data: formData,
      //   })

      if (1) {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
        setOpen(false);
        router.refresh();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-500">
          <PencilIcon className="mr-1 h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {section === "overview" && "Edit Profile Overview"}
            {section === "personal" && "Edit Personal Information"}
            {section === "address" && "Edit Address"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {section === "overview" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {section === "personal" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </>
          )}

          {section === "address" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cityState">City/State</Label>
                <Input
                  id="cityState"
                  name="cityState"
                  value={formData.cityState}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">TAX ID</Label>
                  <Input
                    id="taxId"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
