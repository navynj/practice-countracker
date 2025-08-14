import Button from '@/components/button/Button';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const DUMMY_TODOS = [
  { title: 'Love me like this', id: '1' },
  { title: 'Fly!', id: '2' },
  { title: "Can't Stop", id: '3' },
];

const TodoContent = () => {
  const pathname = usePathname();
  const router = useRouter();

  const startProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('start');
    router.push('/in-progress');
  };

  return (
    <ul>
      {DUMMY_TODOS.map(({ title, id }) => (
        <li
          key={id}
          className="pr-6 flex justify-between items-center border-b border-gray-200/80"
        >
          <Link href={`/project/${id}`} className="w-full">
            <span className="py-6 pl-6 text-lg w-full block">{title}</span>
          </Link>
          <Button
            className="px-4 py-1 h-fit text-sm rounded-md"
            onClick={startProject}
          >
            Start
          </Button>
        </li>
      ))}
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
