import { SiteMeasurement } from "@/apis/projects";
import React from "react";

type Props = {
  measurement: SiteMeasurement;
};

export const SiteMeasurementCard: React.FC<Props> = ({ measurement }) => {
  const { length, width, height, area, unit, description } = measurement;
  const fallback = "Not Provied";

  return (
    <div className="h-full w-full rounded-md bg-white p-5">
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        {length !== null && (
          <div>
            <span className="font-medium text-gray-500">Length:</span>{" "}
            {length ? length : fallback} {"  "}
            {unit}
          </div>
        )}
        {width !== null && (
          <div>
            <span className="font-medium text-gray-500">Width:</span>{" "}
            {width ? width : fallback} {"  "}
            {unit}
          </div>
        )}
        {height !== null && (
          <div>
            <span className="font-medium text-gray-500">Height:</span>{" "}
            {height ? height : fallback} {"  "}
            {unit}
          </div>
        )}
        {area !== null && (
          <div>
            <span className="font-medium text-gray-500">Area:</span>{" "}
            {area ? area : fallback} {"  "}
            {unit}
            <sup>2</sup>
          </div>
        )}
        {description && (
          <div className="col-span-2 break-words text-sm text-gray-600">
            <span className="font-medium">Description:</span> {description}{" "}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque
            illo, ipsam voluptatum recusandae amet ex expedita ratione ullam
            unde alias veniam fuga, inventore aut voluptatibus rem dolores,
            commodi id illum.
          </div>
        )}
      </div>
    </div>
  );
};
