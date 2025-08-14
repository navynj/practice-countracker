import { queryClient } from '@/lib/query';
import dayjs from 'dayjs';
import { getDashDate } from './date';

export const updateAtom = (data: any, key: string | any[]) => {
  queryClient.setQueryData(
    typeof key === 'string' ? [key] : key,
    (prev: any) => {
      return [
        ...prev.filter((item: any) => item.id !== data.id),
        data,
      ].toSorted((a, b) => (dayjs(a.createdAt) < dayjs(b.createdAt) ? 1 : -1));
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
