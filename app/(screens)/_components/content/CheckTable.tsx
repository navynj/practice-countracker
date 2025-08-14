import { todayAtom } from '@/store/ui';
import { cn } from '@/util/cn';
import { getDashDate } from '@/util/date';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface CheckTableProps {
  data: any[]; // TODO: Specify type
  disabled?: boolean;
}

interface CheckCircleProps {
  projectId?: string;
  checked: boolean;
}

const CheckTable = ({ data, disabled }: CheckTableProps) => {
  const pathname = usePathname();
  return (
    <>
      <table className="w-full">
        <tbody>
          {data.map(({ id, title, checked, total }) => (
            <tr key={id} className="border-b border-gray-200/80">
              <td className="text-lg border-r border-gray-200/80" colSpan={3}>
                <Link
                  className="block p-4 pl-6 "
                  href={`${pathname}?project-input=show&projectId=${id}`}
                >
                  {title}
                </Link>
              </td>
              <td className="p-4 flex flex-wrap gap-1 w-full" colSpan={3}>
                {Array.from(new Array(checked)).map((_, i) => (
                  <CheckCircle key={i} projectId={id} checked={true} />
                ))}
                {Array.from(new Array(total - checked)).map((_, i) => (
                  <CheckCircle
                    key={i + checked}
                    projectId={id}
                    checked={false}
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        className="block px-6 py-4 text-gray-400"
        href={`${pathname}?project-input=show`}
      >
        + Add New Project
      </Link>
    </>
  );
};

export const CheckCircle = ({ projectId, checked }: CheckCircleProps) => {
  const today = useAtomValue(todayAtom);

  const checkHandler = () => {
    const date = getDashDate(today);
    console.log(projectId, date, !checked);
  };

  return (
    <div
      className={cn(
        'w-7 h-7 rounded-full border border-2',
        checked ? 'border-primary' : 'border-gray-200',
        projectId ? 'cursor-pointer' : ''
      )}
      onClick={projectId ? checkHandler : undefined}
    />
  );
};

export default CheckTable;
