'use client';

import Tab from '@/components/tab/Tab';
import { StatusType } from '@/types/data';

const PROJECT_STATUS_TAB = [
  { label: 'Todo', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Archived', value: 'archived' },
];

interface StatusTabProps {
  status: StatusType;
  setStatus: (status: StatusType) => void;
  isWhite?: boolean;
}

const StatusTab = ({ status, setStatus, isWhite }: StatusTabProps) => {
  const statusHandler = (value: StatusType) => {
    setStatus(value);
  };

  return (
    <Tab
      className="text-xs"
      id="song-status"
      data={PROJECT_STATUS_TAB}
      value={status}
      setValue={statusHandler}
      isWhite={isWhite}
    />
  );
};

export default StatusTab;
