import React, { PropsWithChildren } from 'react';

interface ScreenTitleProps {
  title: string;
  subtitle?: string | number;
}

const ScreenTitle = ({
  title,
  subtitle,
  children,
}: PropsWithChildren<ScreenTitleProps>) => {
  return (
    <div className="w-full flex justify-between items-center bg-primary text-white p-6 font-extrabold h-[6.75rem]">
      <div>
        <h5>{subtitle}</h5>
        <h1 className="text-2xl">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default ScreenTitle;
