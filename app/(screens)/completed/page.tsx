'use client';

import { useEffect, useState } from 'react';
import CompletedContent from '../_components/content/CompletedContent';
import CompletedTitle from '../_components/title/CompletedTitle';
import { useAtomValue } from 'jotai';
import { projectArchivedAtom, projectCompletedAtom } from '@/store/project';
import { cn } from '@/util/cn';
import Loader from '@/components/loader/Loader';

const CompletedPage = ({ isWhite }: { isWhite: boolean }) => {
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
        isWhite={isWhite}
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
