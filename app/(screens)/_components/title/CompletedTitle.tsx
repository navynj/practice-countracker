'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import ScreenTitle, { ScreenTitleProps } from './ScreenTitle';
import { cn } from '@/util/cn';

interface CompletedTitle extends Pick<ScreenTitleProps, 'isWhite'> {
  showArchive: boolean;
  setShowArchive: Dispatch<SetStateAction<boolean>>;
}

const CompletedTitle = ({
  showArchive,
  setShowArchive,
  isWhite,
}: CompletedTitle) => {
  const toggleShowArchive = () => {
    setShowArchive((prev) => !prev);
  };
  return (
    <ScreenTitle
      title={showArchive ? 'Archived' : 'Completed'}
      isWhite={isWhite}
    >
      <button
        className={cn(
          'text-sm flex flex-col gap-2 items-center translate-y-1 opacity-20'
        )}
        onClick={toggleShowArchive}
      >
        <span>{showArchive ? 'Completed' : 'Archived'}</span>
      </button>
    </ScreenTitle>
  );
};

export default CompletedTitle;
