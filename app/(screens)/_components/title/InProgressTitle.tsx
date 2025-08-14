import React from 'react';
import ScreenTitle from './ScreenTitle';
import dayjs from 'dayjs';
import DayNav from '@/components/date/DayNav';
import { useAtomValue } from 'jotai';
import { todayAtom } from '@/store/ui';

const InProgressTitle = () => {
  const today = useAtomValue(todayAtom);

  return (
    <ScreenTitle
      title={dayjs(today).format('MMMM')}
      subtitle={today.getFullYear()}
    >
      <DayNav />
    </ScreenTitle>
  );
};

export default InProgressTitle;
