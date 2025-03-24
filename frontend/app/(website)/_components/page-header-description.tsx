import { FC } from "react";

type Props = {
  title: string;
  description: string;
};

export const PageHeaderDescription: FC<Props> = ({ title, description }) => {
  return (
    <>
      <h1 className="mb-8 text-center text-4xl font-bold">{title}</h1>
      <p className="mx-auto mb-12 max-w-3xl text-center text-xl text-gray-600">
        {description}
      </p>
    </>
  );
};
