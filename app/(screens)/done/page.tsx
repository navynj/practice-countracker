'use client';

import { todayAtom } from '@/store/ui';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import ScreenTitle from '../_components/ScreenTitle';
import DayNav from '@/components/date/DayNav';
import { useState } from 'react';
import { cn } from '@/util/cn';

const DonePage = () => {
  const [showArchive, setShowArchive] = useState(false);

  const toggleShowArchive = () => {
    setShowArchive((prev) => !prev);
  };

  return (
    <>
      <ScreenTitle title="Done">
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
      <div></div>
    </>
  );
};

export default DonePage;
