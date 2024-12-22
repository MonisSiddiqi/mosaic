"use client";

import { FC } from "react";

import BackgroundImage from "@/app/assets/page-header-background.webp";

import Image from "next/image";

type Props = {
  title: string;
};

const PageHeader: FC<Props> = ({ title }) => {
  return (
    <div className="relative h-56 w-full">
      <Image
        src={BackgroundImage.src}
        alt={title}
        fill
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
