"use client";

import React from "react";

import LoginImage from "@/app/assets/login-image.jpg";
import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen max-h-screen min-h-screen w-full bg-muted lg:grid lg:grid-cols-2">
      <header className="col-span-2 h-fit w-full bg-white px-2 py-4">
        <div className="w-fit px-4">
          <Link href="/">
            <Image
              className="rounded-md fill-white"
              src={Logo}
              alt="Logo"
              width={150}
              height={40}
            />
          </Link>
        </div>
      </header>
      {children}
      <div className="relative hidden h-full w-full overflow-hidden bg-slate-700 lg:block">
        <div className="absolute inset-0 flex items-center justify-center bg-black/50"></div>
        <Image
          src={LoginImage.src}
          alt="Login background"
          className="size-full object-cover"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
