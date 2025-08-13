import { cn } from '@/util/cn';
import React, { PropsWithChildren } from 'react';

export interface ScreenTitleProps {
  title: string;
  subtitle?: string | number;
  isWhite?: boolean;
}

const ScreenTitle = ({
  title,
  subtitle,
  isWhite,
  children,
}: PropsWithChildren<ScreenTitleProps>) => {
  return (
    <div
      className={cn(
        'w-full flex justify-between items-center p-6 font-extrabold h-[6.75rem]',
        isWhite ? '' : 'bg-primary text-white '
      )}
    >
      <div>
        <h5>{subtitle}</h5>
        <h1 className="text-2xl">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default ScreenTitle;
