import { ClassNameProps } from '@/types/className';
import { cn } from '@/util/cn';
import React, { PropsWithChildren } from 'react';

export interface ScreenTitleProps extends ClassNameProps {
  title?: string;
  subtitle?: string | number;
  isWhite?: boolean;
}

const ScreenTitle = ({
  title,
  subtitle,
  isWhite,
  className,
  children,
}: PropsWithChildren<ScreenTitleProps>) => {
  return (
    <div
      className={cn(
        'w-full flex justify-between items-center p-6 font-extrabold h-[6.75rem]',
        isWhite ? '' : 'bg-primary text-white ',
        className
      )}
    >
      {(title || subtitle) && (
        <div>
          <h5>{subtitle}</h5>
          <h1 className="text-2xl">{title}</h1>
        </div>
      )}
      {children}
    </div>
  );
};

export default ScreenTitle;
