"use client";

import { useAuth } from "@/hooks/use-auth";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoaderComponent } from "@/components/loader-component";

import { ProfileOverview } from "@/app/dashboard/profile/-components/profile-overview";
import { PersonalInformation } from "@/app/dashboard/profile/-components/personal-information";

export const ProfilePageContainer = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?redirect=/profile");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <LoaderComponent showText className="size-full" />;
  }

  return (
    <div className="space-y-7">
      <ProfileOverview />
      <PersonalInformation />
    </div>
  );
};
