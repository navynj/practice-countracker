import { queryClient } from '@/lib/query';
import dayjs from 'dayjs';

export const updateAtom = (data: any, key: string | any[]) => {
  queryClient.setQueryData(
    typeof key === 'string' ? [key] : key,
    (prev: any) => {
      if (prev) {
        return [
          ...prev.filter((item: any) => item.id !== data.id),
          data,
        ].toSorted((a, b) => {
          return key.includes('log') &&
            a.project?.createdAt &&
            b.project?.createdAt
            ? dayjs(a.project.createdAt).isBefore(dayjs(b.project.createdAt))
              ? -1
              : 1
            : dayjs(a.createdAt).isBefore(dayjs(b.createdAt))
            ? -1
            : 1;
        });
      } else {
        return [data];
      }
    }
  );
};

export const replaceAtom = (data: any, key: string | any[]) => {
  queryClient.setQueryData(typeof key === 'string' ? [key] : key, data);
};

export const removeAtom = (id: string, key: string | any[]) => {
  queryClient.setQueryData(typeof key === 'string' ? [key] : key, (prev: any) =>
    prev?.filter((item: any) => item.id !== id)
  );
};
