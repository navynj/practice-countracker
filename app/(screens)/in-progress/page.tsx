'use client';

import CheckTable from '../_components/content/CheckTable';
import CompletedContent from '../_components/content/CompletedContent';
import TodoContent from '../_components/content/TodoContent';
import CompletedTitle from '../_components/title/CompletedTitle';
import InProgressTitle from '../_components/title/InProgressTitle';
import TodoTitle from '../_components/title/TodoTitle';

const DUMMY_SONGS = [
  { id: '1', title: 'Love me like this', checked: 2, total: 5 },
  { id: '2', title: 'Fly!', checked: 0, total: 4 },
  { id: '3', title: "Can't Stop", checked: 0, total: 3 },
];

const InProgressPage = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block lg:max-w-4/14 w-full">
        <TodoTitle isWhite={true} />
        <TodoContent />
      </div>
      <div className="lg:max-w-6/14 w-full">
        <InProgressTitle />
        <CheckTable data={DUMMY_SONGS} />
      </div>
      <div className="hidden lg:block lg:max-w-4/14 w-full">
        <CompletedTitle isWhite={true} />
        <CompletedContent />
      </div>
    </div>
  );
};

export default InProgressPage;
