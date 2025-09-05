import { SiteMeasurement } from "@/apis/projects";
import React from "react";

type Props = {
  measurement: SiteMeasurement;
};

export const SiteMeasurementCard: React.FC<Props> = ({ measurement }) => {
  const { length, width, height, area, unit, description } = measurement;
  const fallback = "Not Provied";

  return (
    <div className="h-full w-full rounded-md border border-gray-200 bg-white p-5">
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        <div>
          <span className="font-medium text-gray-500">Length:</span>{" "}
          {length ? length : fallback} {"  "}
          {length ? unit : null}
        </div>

        <div>
          <span className="font-medium text-gray-500">Width:</span>{" "}
          {width ? width : fallback} {"  "}
          {width ? unit : null}
        </div>

        <div>
          <span className="font-medium text-gray-500">Height:</span>{" "}
          {height ? height : fallback} {"  "}
          {height ? unit : null}
        </div>

        <div>
          <span className="font-medium text-gray-500">Area:</span>{" "}
          {area ? area : fallback} {"  "}
          {area ? (
            <>
              {unit} <sup>2</sup>
            </>
          ) : null}
        </div>
        {description && (
          <div className="col-span-2 break-words text-sm text-gray-600">
            <span className="font-medium">Description:</span> {description}
          </div>
        )}
      </div>
    </div>
  );
};
