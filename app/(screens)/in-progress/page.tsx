'use client';

import { logsTodayAtom } from '@/store/log';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import CheckTable from '../_components/content/CheckTable';
import InProgressTitle from '../_components/title/InProgressTitle';
import CompletedPage from '../completed/page';
import TodoPage from '../todo/page';

const InProgressPage = () => {
  const { data, isFetching } = useAtomValue(logsTodayAtom);
  const [isInitalLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!isFetching) {
      setInitialLoading(false);
    }
  }, [isFetching]);

  return (
    <>
      {
        <div className="flex">
          <div className="hidden lg:block lg:max-w-4/14 w-full">
            <TodoPage isWhite={true} />
          </div>
          <div className="lg:max-w-6/14 w-full">
            <InProgressTitle />
            <CheckTable data={data || []} isLoading={isInitalLoading} />
          </div>
          <div className="hidden lg:block lg:max-w-4/14 w-full">
            <CompletedPage isWhite={true} />
          </div>
        </div>
      }
    </>
  );
};

export default InProgressPage;
