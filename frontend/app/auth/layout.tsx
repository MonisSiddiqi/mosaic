import React from "react";

import LoginImage from "@/app/assets/login-image.jpg";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="grid h-screen max-h-screen min-h-screen w-full bg-gray-100 lg:grid-cols-2">
      {children}
      <div className="hidden h-full w-full overflow-hidden bg-slate-700 lg:block">
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
