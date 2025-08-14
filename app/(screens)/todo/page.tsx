'use client';

import TodoContent from '../_components/content/TodoContent';
import TodoTitle from '../_components/title/TodoTitle';

const TodoPage = ({ isWhite }: { isWhite: boolean }) => {
  return (
    <>
      <TodoTitle isWhite={isWhite} />
      <TodoContent />
    </>
  );
};

export default TodoPage;
