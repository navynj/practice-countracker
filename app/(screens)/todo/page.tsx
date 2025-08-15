'use client';

import { usePathname } from 'next/navigation';
import TodoContent from '../_components/content/TodoContent';
import TodoTitle from '../_components/title/TodoTitle';

const TodoPage = () => {
  const pathname = usePathname();

  return (
    <>
      <TodoTitle isWhite={!pathname.includes('todo')} />
      <TodoContent />
    </>
  );
};

export default TodoPage;
