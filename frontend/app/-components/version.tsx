import { VERSION } from "@/config";

export const Version = () => {
  return (
    <div className="rounded border border-gray-200 bg-white p-4 text-gray-700">
      <span className="text-gray-400">Version</span> v{VERSION}
    </div>
  );
};
