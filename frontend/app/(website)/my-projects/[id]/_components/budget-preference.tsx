import React from "react";

type Props = {
  budgetPreference: number;
  preferenceMessage?: string | null;
};

const getPreferenceLabel = (value: number) => {
  if (value <= 3) return "Affordable";
  if (value <= 7) return "Balanced";
  return "High Quality";
};

const BudgetPreferenceCard: React.FC<Props> = ({
  budgetPreference,
  preferenceMessage,
}) => {
  const preferenceLabel = getPreferenceLabel(budgetPreference);

  return (
    <div className="w-full rounded-md border bg-white p-5 shadow-sm">
      {/* Title */}
      <div className="mb-4 text-sm font-medium text-gray-700">
        Budget Preference:{" "}
        <span className="font-semibold text-blue-600">{preferenceLabel}</span> (
        <span className="font-semibold text-blue-600">{budgetPreference}</span>
        /10)
      </div>

      {/* Scale */}
      <div className="relative mt-8 flex h-4 w-full items-center justify-between gap-2 rounded-full">
        {[...Array(10)].map((_, i) => {
          const index = i + 1;
          const isActive = index === budgetPreference;

          return (
            <div
              key={index}
              className={`h-4 w-full flex-1 rounded-full transition-all duration-200 ${
                isActive ? "bg-blue-500" : "bg-blue-100"
              }`}
            />
          );
        })}

        {/* Marker */}
        <div
          className="absolute -top-5 translate-x-2 transform text-xs font-semibold text-blue-600 transition-all duration-200"
          style={{ left: `${(budgetPreference - 1) * 10}%` }}
        >
          {preferenceLabel}
        </div>
      </div>

      {/* Scale Explanation */}
      <div className="mt-4 flex justify-between px-1 text-xs text-gray-500">
        <span>1 - 3: Affordable</span>
        <span>4 - 7: Balanced</span>
        <span>8 - 10: High Quality</span>
      </div>

      {/* Optional message */}
      {preferenceMessage && (
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-medium text-gray-700">Note:</span>{" "}
          {preferenceMessage}
        </div>
      )}
    </div>
  );
};

export default BudgetPreferenceCard;
