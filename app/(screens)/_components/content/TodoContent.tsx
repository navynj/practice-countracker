'use client';

import Button from '@/components/button/Button';
import Loader from '@/components/loader/Loader';
import { projectMutation, projectTodoAtom } from '@/store/project';
import { ProjectType } from '@/types/data';
import { cn } from '@/util/cn';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TodoContent = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data, isFetching } = useAtomValue(projectTodoAtom);
  const { mutate: projectMutate } = useAtomValue(projectMutation);

  const [isInitalLoading, setInitialLoading] = useState(true);

  const startProject = (project: ProjectType) => {
    projectMutate({ ...project, status: 'in-progress' });
    if (!pathname.includes('in-progress')) {
      router.push('/in-progress');
    }
  };

  useEffect(() => {
    if (!isFetching) {
      setInitialLoading(false);
    }
  }, [isFetching]);

  return isInitalLoading ? (
    <div className={cn('w-full h-full flex justify-center items-center py-40')}>
      <Loader />
    </div>
  ) : (
    <ul>
      {data?.map((project) => {
        const { id, title } = project;
        return (
          <li
            key={id}
            className="pr-6 flex justify-between items-center border-b border-gray-200/80"
          >
            <Link
              href={`/project/${id}?title=${encodeURIComponent(title)}`}
              className={cn('w-full', !!id ? '' : 'pointer-events-none')}
              aria-disabled={!!id}
            >
              <span className="py-6 pl-6 text-lg w-full block">{title}</span>
            </Link>
            <Button
              className="px-4 py-1 h-fit text-sm rounded-md"
              onClick={id ? startProject.bind(null, project) : undefined}
            >
              Start
            </Button>
          </li>
        );
      })}
      <li>
        <Link
          className="block p-6 text-gray-400"
          href={`${pathname}?project-input=show`}
        >
          + Add New Project
        </Link>
      </li>
    </ul>
  );
};

export default TodoContent;
