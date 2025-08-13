'use client';

import { ClassNameProps } from '@/types/className';
import { cn } from '@/util/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaInbox, FaSquareCheck } from 'react-icons/fa6';
import { RiLoader2Fill } from 'react-icons/ri';

const NAV_DATA: { [key: string]: any }[] = [
  { path: '/todo', icon: <FaInbox />, title: 'Todo' },
  { path: '/in-progress', icon: <RiLoader2Fill />, title: 'In Progress' },
  { path: '/done', icon: <FaSquareCheck />, title: 'Done' },
];

const Nav = ({ className }: ClassNameProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'px-12 flex gap-6 justify-center items-center text-xl text-gray-300 bg-white',
        '[&>a]:flex [&>a]:flex-col [&>a]:justify-center [&>a]:items-center',
        '[&>div]:flex [&>div]:flex-col [&>div]:justify-center [&>div]:items-center',
        '[&_span]:text-[0.625rem] [&_span]:font-bold',
        className
      )}
    >
      {NAV_DATA.map(({ path, icon, title }) => (
        <Link
          href={path}
          key={path}
          className={pathname === path ? 'text-primary w-full' : 'w-full'}
        >
          {icon}
          <span>{title}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
