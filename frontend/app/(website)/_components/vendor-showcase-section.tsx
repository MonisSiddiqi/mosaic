"use client";

import { UserRole } from "@/apis/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useUsersQuery } from "@/queries/users.queries";
import { MapPinIcon } from "lucide-react";
import Marquee from "react-fast-marquee";

export const VendorShowcaseSection = () => {
  const { data } = useUsersQuery({
    filter: [{ id: "role", value: [UserRole.VENDOR] }],
    pagination: { pageSize: 10, pageIndex: -1 },
  });

  return (
    <section className="bg-green-50 py-12">
      <div>
        <p className="text-center text-3xl font-bold text-gray-800">
          Our Vendors
        </p>

        <div className="mt-7 w-screen">
          <Marquee gradient pauseOnHover={true}>
            <div className="mr-6 flex gap-6">
              {data?.list.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex w-80 flex-col gap-6 rounded-md border border-gray-200 bg-white p-6"
                >
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Avatar className="size-20">
                      <AvatarImage src={vendor.UserProfile?.image as string} />
                      <AvatarFallback>
                        {getInitials(vendor.UserProfile?.name || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center">
                      <p className="text-center text-lg font-semibold text-gray-800">
                        {vendor.UserProfile?.name}
                      </p>
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPinIcon className="size-4 min-w-4" />
                        <p>{vendor.Address?.city || vendor.Address?.country}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {vendor.vendorServices?.slice(0, 5).map((vendorService) => (
                      <span
                        key={vendorService.serviceId}
                        className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
                      >
                        {vendorService.service.name}
                      </span>
                    ))}
                    {vendor.vendorServices &&
                      vendor.vendorServices.length > 5 && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                          +{vendor.vendorServices.length - 5} more
                        </span>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
};
