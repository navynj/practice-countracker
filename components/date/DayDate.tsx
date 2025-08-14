import { cn } from '@/util/cn';
import React from 'react';

interface YearMonthProps {
  date: Date;
  onClick?: React.MouseEventHandler;
  isWhite?: boolean;
}

const DayDate = ({ date, onClick, isWhite }: YearMonthProps) => {
  return (
    <div
      className={cn('text-center font-extrabold', isWhite ? 'text-white' : '')}
      onClick={onClick}
    >
      <p className="text-2xl">{date.getDate()}</p>
      <p className="text-xs leading-3">
        {date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
      </p>
    </div>
  );
};

export default DayDate;
