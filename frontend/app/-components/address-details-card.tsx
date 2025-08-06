import { Address } from "@/apis/addresses";

export const AddressDetailsCard = ({
  line1,
  line2,
  city,
  state,
  country,
  postalCode,
}: Omit<Address, "id" | "createdAt" | "updatedAt">) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Address</h2>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
        <div>
          <p className="mb-1 text-sm text-gray-500">Line 1</p>
          <p className="text-gray-700">{line1 || "N/A"}</p>
        </div>
        <div>
          <p className="mb-1 text-sm text-gray-500">Line 2</p>
          <p className="text-gray-700">{line2 || "N/A"}</p>
        </div>

        <div>
          <p className="mb-1 text-sm text-gray-500">City</p>
          <p className="text-gray-700">{city || "N/A"}</p>
        </div>

        <div>
          <p className="mb-1 text-sm text-gray-500">State</p>
          <p className="text-gray-700">{state || "N/A"}</p>
        </div>

        <div>
          <p className="mb-1 text-sm text-gray-500">Country</p>
          <p className="text-gray-700">{country || "N/A"}</p>
        </div>

        <div>
          <p className="mb-1 text-sm text-gray-500">Postal Code</p>
          <p className="text-gray-700">{postalCode || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};
