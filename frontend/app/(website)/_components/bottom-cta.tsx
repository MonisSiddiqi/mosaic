import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import TreeBackground from "@/app/assets/tree-background.webp";

export const BottomCta = () => {
  return (
    <div className="relative h-72 w-full">
      <Image
        src={TreeBackground.src}
        width={TreeBackground.width}
        height={TreeBackground.height}
        alt="@Background"
        className="h-full w-full object-cover opacity-20"
      />
      <div className="absolute left-0 right-0 top-0 z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Ready to Transform Your Home?</h2>
          <p className="text-lg">
            Discover the power of mosaic and create a beautiful, modern home.
          </p>
          <Button className="mt-4 rounded-md px-8 py-3 text-white">
            <Link href={"/my-projects/add"}> Start Your Project</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
