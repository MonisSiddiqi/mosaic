"use client";

import { useRef } from "react";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { Address } from "@/apis/addresses";

const libraries = ["places"];

type ExtractedAddress = Omit<
  Address,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

export default function GoogleMapAddressSearchBox({
  onSelect,
  defaultValue,
}: {
  onSelect: (data: ExtractedAddress) => void;
  defaultValue?: string;
}) {
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries as any,
  });

  const extractAddressFields = (
    place: google.maps.places.PlaceResult,
  ): ExtractedAddress => {
    const get = (type: string) =>
      place.address_components?.find((c) => c.types.includes(type))
        ?.long_name || "";

    const lat = place.geometry?.location?.lat() || 0;
    const lng = place.geometry?.location?.lng() || 0;

    return {
      line1: place.formatted_address || "",
      line2: "", // optionally set this based on your UI
      country: get("country"),
      state: get("administrative_area_level_1") || "N/A",
      city: get("locality") || get("administrative_area_level_3") || "N/A",
      postalCode: get("postal_code") || "N/A",
      lat,
      lng,
    };
  };

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const parsed = extractAddressFields(place);
      onSelect(parsed);
    }
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <StandaloneSearchBox
      onLoad={(ref) => (searchBoxRef.current = ref)}
      onPlacesChanged={handlePlacesChanged}
    >
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        type="text"
        placeholder="Enter address"
        className="w-full rounded border p-2"
      />
    </StandaloneSearchBox>
  );
}
