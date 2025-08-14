'use client';

import CheckTable from '@/app/(screens)/_components/content/CheckTable';
import CompletedContent from '@/app/(screens)/_components/content/CompletedContent';
import TodoContent from '@/app/(screens)/_components/content/TodoContent';
import StatusTab from '@/app/(screens)/_components/form/StatusTab';
import CompletedTitle from '@/app/(screens)/_components/title/CompletedTitle';
import ScreenTitle from '@/app/(screens)/_components/title/ScreenTitle';
import TodoTitle from '@/app/(screens)/_components/title/TodoTitle';
import Tab from '@/components/tab/Tab';
import { StatusType } from '@/store/project';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { use, useState } from 'react';
import { FaPencil } from 'react-icons/fa6';

const DUMMY_SONGS = [
  { title: '2024-08-13', checked: 2, total: 5 },
  { title: '2024-08-12', checked: 0, total: 4 },
  { title: '2024-08-11', checked: 0, total: 3 },
];

const PROJECT_STATUS_TAB = [
  { label: 'Todo', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Archived', value: 'archived' },
];

const ProjectPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { id: projectId } = use(params);

  const [status, setStatus] = useState<StatusType>('in-progress');

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex">
      <div className="hidden lg:block lg:max-w-4/14 w-full">
        <TodoTitle isWhite={true} />
        <TodoContent />
      </div>
      <div className="lg:max-w-6/14 w-full">
        <ScreenTitle className="flex justfy-between">
          <button onClick={goBack}>&lt;</button>
          <div className="flex flex-col items-center gap-2 pt-2">
            <h1 className="text-2xl">Song Title</h1>
            <StatusTab status={status} setStatus={setStatus} isWhite={true} />
          </div>
          <Link href={`${pathname}?project-input=show&projectId=${projectId}`}>
            <FaPencil />
          </Link>
        </ScreenTitle>
        <CheckTable data={DUMMY_SONGS} disabled={true} />
      </div>
      <div className="hidden lg:block lg:max-w-4/14 w-full">
        <CompletedTitle isWhite={true} />
        <CompletedContent />
      </div>
    </div>
  );
};

export default ProjectPage;
