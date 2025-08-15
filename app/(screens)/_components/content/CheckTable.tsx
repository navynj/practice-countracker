import Loader from '@/components/loader/Loader';
import { logFormDataAtom, logMutation } from '@/store/log';
import { projectFormDataAtom } from '@/store/project';
import { LogType } from '@/types/data';
import { cn } from '@/util/cn';
import dayjs from 'dayjs';
import { useAtomValue, useSetAtom } from 'jotai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaPencil } from 'react-icons/fa6';

interface CheckTableProps {
  data: LogType[];
  isLoading: boolean;
  disabled?: boolean;
}

interface CheckCircleProps {
  log?: LogType;
  checked: boolean;
  count?: number;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
}

const CheckTable = ({ isLoading, data }: CheckTableProps) => {
  const pathname = usePathname();

  return isLoading ? (
    <div className={cn('w-full h-full flex justify-center items-center py-40')}>
      {' '}
      <Loader />{' '}
    </div>
  ) : (
    <>
      <table className="w-full">
        <tbody>
          {data.map((log) => (
            <CheckRow key={log.id} {...log} />
          ))}
        </tbody>
      </table>
      {!pathname.includes('project') && (
        <Link
          className="block px-6 py-4 text-gray-400"
          href={`${pathname}?project-input=show&status=in-progress`}
        >
          + Add New Project
        </Link>
      )}
    </>
  );
};

export const CheckRow = (log: LogType) => {
  const { id, project, count, goal, date } = log;
  const pathname = usePathname();

  const setProjectFormData = useSetAtom(projectFormDataAtom);
  const setLogFormData = useSetAtom(logFormDataAtom);

  const [uiCount, setUiCount] = useState(count || 0);

  const isProjectPage = pathname.includes('project');

  useEffect(() => {
    setUiCount(count);
  }, [count]);

  return (
    <tr key={id} className="border-b border-gray-200/80">
      <td className="text-lg border-r border-gray-200/80" colSpan={3}>
        <Link
          className="block p-4 pl-6 "
          href={`${pathname}?project-input=show&projectId=${id}`}
          onClick={project ? setProjectFormData.bind(null, project) : undefined}
        >
          {isProjectPage
            ? dayjs(date).format('YYYY. MM. DD (ddd)')
            : project?.title}
        </Link>
      </td>
      <td className="p-4 flex justify-between items-center w-full" colSpan={3}>
        <div className="flex flex-wrap gap-1">
          {Array.from(new Array(uiCount)).map((_, i) => (
            <CheckCircle
              key={i}
              log={log}
              checked={true}
              count={uiCount}
              setCount={isProjectPage ? undefined : setUiCount}
            />
          ))}
          {Array.from(new Array(goal - uiCount)).map((_, i) => (
            <CheckCircle
              key={i + uiCount}
              log={log}
              checked={false}
              count={uiCount}
              setCount={isProjectPage ? undefined : setUiCount}
            />
          ))}
        </div>
        {!isProjectPage && (
          <Link
            className="text-xs text-gray-400"
            href={`${pathname}?daily-goal=show`}
            onClick={() => {
              setLogFormData(log);
            }}
          >
            <FaPencil />
          </Link>
        )}
      </td>
    </tr>
  );
};

export const CheckCircle = ({
  log,
  checked,
  count: countProp,
  setCount,
}: CheckCircleProps) => {
  const count = countProp || 0;
  const { mutate } = useAtomValue(logMutation);

  const [uiChecked, setUiChecked] = useState(checked);

  const checkHandler = () => {
    if (checked) {
      const nextCount = count < 1 ? 0 : count - 1;
      setCount && setCount(nextCount);
      mutate({ ...log, count: nextCount });
    } else {
      const nextCount = count + 1;
      setCount && setCount(nextCount);
      mutate({ ...log, count: nextCount });
    }
  };

  useEffect(() => {
    setUiChecked(checked);
  }, [checked]);

  return (
    <div
      className={cn(
        'w-7 h-7 rounded-full border border-2',
        uiChecked ? 'border-primary' : 'border-gray-200',
        setCount ? 'cursor-pointer' : ''
      )}
      onClick={setCount ? checkHandler : undefined}
    />
  );
};

export default CheckTable;
