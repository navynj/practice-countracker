import { ProjectType } from '@/types/data';
import Link from 'next/link';

const CompletedContent = ({ data }: { data: ProjectType[] }) => {
  return (
    <ul>
      {data?.map(({ title, id }) => (
        <li
          key={id}
          className="p-6 flex justify-between items-center border-b border-gray-200/80"
        >
          <Link href={`/project/${id}`} className="w-full flex justify-between">
            <span className="text-lg w-full block">{title}</span>
            <span className="font-extrabold text-xs">&gt;</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CompletedContent;
