import React from 'react';
import ScreenTitle, { ScreenTitleProps } from './ScreenTitle';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';

const TodoTitle = ({ isWhite }: Pick<ScreenTitleProps, 'isWhite'>) => {
  const pathname = usePathname();

  return (
    <ScreenTitle title="Todo" isWhite={isWhite}>
      <Link href={`${pathname}?project-input=show`}>
        <FaPlus className={isWhite ? '' : 'text-white'} />
      </Link>
    </ScreenTitle>
  );
};

export default TodoTitle;
