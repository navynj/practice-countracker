'use client';

import DoneTitle from '../_components/title/DoneTitle';
import InProgressTitle from '../_components/title/InProgressTitle';
import TodoTitle from '../_components/title/TodoTitle';

const InProgressPage = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block lg:max-w-4/14 w-full">
        <TodoTitle isWhite={true} />
      </div>
      <div className="lg:max-w-6/14 w-full">
        <InProgressTitle />
      </div>
      <div className="hidden lg:block lg:max-w-4/14 w-full">
        <DoneTitle isWhite={true} />
      </div>
    </div>
  );
};

export default InProgressPage;
