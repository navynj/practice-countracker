'use client';

import { todayAtom } from '@/store/ui';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import ScreenTitle from '../_components/ScreenTitle';
import DayNav from '@/components/date/DayNav';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';

const InProgressPage = () => {
  const pathname = usePathname();
  const today = useAtomValue(todayAtom);

  return (
    <>
      <ScreenTitle title="Todo">
        <Link href={`${pathname}?project-input=show`}>
          <FaPlus className="text-white" />
        </Link>
      </ScreenTitle>
      <div></div>
    </>
  );
};

export default InProgressPage;
