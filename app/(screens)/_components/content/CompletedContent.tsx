import Link from 'next/link';

const DUMMY_COMPLETEDS = [
  { title: 'Love me like this', id: '1' },
  { title: 'Fly!', id: '2' },
  { title: "Can't Stop", id: '3' },
];

const CompletedContent = () => {
  return (
    <ul>
      {DUMMY_COMPLETEDS.map(({ title, id }) => (
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
