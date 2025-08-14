'use client';

import CheckTable from '@/app/(screens)/_components/content/CheckTable';
import StatusTab from '@/app/(screens)/_components/form/StatusTab';
import ScreenTitle from '@/app/(screens)/_components/title/ScreenTitle';
import Loader from '@/components/loader/Loader';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { projectLogsAtom } from '@/store/log';
import {
  pageProjectAtom,
  projectFormDataAtom,
  projectMutation,
} from '@/store/project';
import { pageProjectIdAtom } from '@/store/ui';
import { StatusType } from '@/types/data';
import { cn } from '@/util/cn';
import { useAtomValue, useSetAtom } from 'jotai';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import CompletedPage from '../../completed/page';
import TodoPage from '../../todo/page';

const ProjectPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isLg = useBreakpoint('lg');

  const { id: projectId } = use(params);
  const title = decodeURIComponent(searchParams.get('title') || '');

  const setPageProject = useSetAtom(pageProjectIdAtom);
  const { data: project } = useAtomValue(pageProjectAtom);
  const { data: projectLogs, isFetching } = useAtomValue(projectLogsAtom);
  const { mutate: projectMutate } = useAtomValue(projectMutation);
  const setProjectFormData = useSetAtom(projectFormDataAtom);

  const [status, setStatus] = useState<StatusType>(
    project?.status || 'in-progress'
  );
  const [isInitalLoading, setInitialLoading] = useState(true);

  const goBackHandler = () => {
    if (isLg) {
      router.push('/in-progress');
    } else {
      router.back();
    }
  };

  const statusChangeHandler = (status: StatusType) => {
    setStatus(status);
    projectMutate({ ...project, status });
  };

  useEffect(() => {
    if (!isFetching) {
      setInitialLoading(false);
    }
  }, [isFetching]);

  useEffect(() => {
    setPageProject(projectId);

    if (project?.status) {
      setStatus(project.status);
    }
  }, [project?.status]);

  return (
    <div className="flex">
      <div className="hidden lg:block lg:max-w-4/14 w-full">
        <TodoPage isWhite={true} />
      </div>
      <div className="lg:max-w-6/14 w-full">
        <ScreenTitle className="flex justfy-between">
          <button onClick={goBackHandler}>&lt;</button>
          <div className="flex flex-col items-center gap-2 pt-2">
            <h1 className="text-2xl">{project?.title || title}</h1>
            <StatusTab
              status={status}
              setStatus={statusChangeHandler}
              isWhite={true}
            />
          </div>
          <Link
            href={`${pathname}?project-input=show&projectId=${projectId}`}
            onClick={() => {
              if (project) {
                setProjectFormData(project);
              }
            }}
          >
            <FaPencil />
          </Link>
        </ScreenTitle>
        {isFetching ? (
          <div
            className={cn(
              'w-full h-full flex justify-center items-center py-40'
            )}
          >
            {' '}
            <Loader />{' '}
          </div>
        ) : (
          <CheckTable data={projectLogs || []} isLoading={isInitalLoading} />
        )}
      </div>
      <div className="hidden lg:block lg:max-w-4/14 w-full">
        <CompletedPage isWhite={true} />
      </div>
    </div>
  );
};

export default ProjectPage;
