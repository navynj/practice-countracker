'use client';

import Loader from '@/components/loader/Loader';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { projectArchivedAtom, projectCompletedAtom } from '@/store/project';
import { cn } from '@/util/cn';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import CompletedContent from '../_components/content/CompletedContent';
import CompletedTitle from '../_components/title/CompletedTitle';
import { usePathname } from 'next/navigation';

const CompletedPage = () => {
  const pathname = usePathname();

  const [showArchive, setShowArchive] = useState(false);
  const [isInitalLoading, setInitialLoading] = useState(true);

  const { data: projectsCompleted, isFetching: isFetchingCompleted } =
    useAtomValue(projectCompletedAtom);
  const { data: projectsArchived, isFetching: isFetchingArchived } =
    useAtomValue(projectArchivedAtom);

  useEffect(() => {
    if (!isFetchingCompleted && !isFetchingArchived) {
      setInitialLoading(false);
    }
  }, [isFetchingCompleted, isFetchingArchived]);

  return (
    <>
      <CompletedTitle
        showArchive={showArchive}
        setShowArchive={setShowArchive}
        isWhite={!pathname.includes('completed')}
      />
      {isInitalLoading ? (
        <div
          className={cn('w-full h-full flex justify-center items-center py-40')}
        >
          <Loader />
        </div>
      ) : (
        <CompletedContent
          data={(showArchive ? projectsArchived : projectsCompleted) || []}
        />
      )}
    </>
  );
};

export default CompletedPage;
