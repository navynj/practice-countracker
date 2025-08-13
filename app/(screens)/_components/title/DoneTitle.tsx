'use client';

import React, { useState } from 'react';
import ScreenTitle, { ScreenTitleProps } from './ScreenTitle';
import { cn } from '@/util/cn';

const DoneTitle = ({ isWhite }: Pick<ScreenTitleProps, 'isWhite'>) => {
  const [showArchive, setShowArchive] = useState(false);

  const toggleShowArchive = () => {
    setShowArchive((prev) => !prev);
  };
  return (
    <ScreenTitle title="Done" isWhite={isWhite}>
      <button
        className={cn(
          'text-sm flex flex-col gap-2 items-center translate-y-1',
          showArchive ? '' : 'opacity-20'
        )}
        onClick={toggleShowArchive}
      >
        <span>Archived</span>
        <span
          className={cn(
            'w-[3px] h-[3px] rounded-full',
            showArchive ? 'bg-white' : ''
          )}
        />
      </button>
    </ScreenTitle>
  );
};

export default DoneTitle;
