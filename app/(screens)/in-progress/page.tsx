'use client';

import { todayAtom } from '@/store/ui';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import ScreenTitle from '../_components/ScreenTitle';
import DayNav from '@/components/date/DayNav';

const InProgressPage = () => {
  const today = useAtomValue(todayAtom);
  return (
    <>
      <ScreenTitle
        title={dayjs(today).format('MMMM')}
        subtitle={today.getFullYear()}
      >
        <DayNav />
      </ScreenTitle>
      <div></div>
    </>
  );
};

export default InProgressPage;
