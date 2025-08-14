import { getDashDate } from '@/util/date';
import { updateAtom } from '@/util/query';
import { atom } from 'jotai';
import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query';
import { pageProjectIdAtom, todayAtom } from './ui';
import { LogType } from '@/types/data';

export const logsTodayAtom = atomWithQuery<LogType[]>((get) => {
  return {
    queryKey: ['log', get(todayAtom)],
    queryFn: async ({ queryKey: [, today] }) => {
      const res = await fetch(`/api/log?date=${getDashDate(today as Date)}`);
      const data = await res.json();
      return data.map((item: any) => {
        const [year, month, day] = item.date.split('-');
        return {
          ...item,
          date: item.date && new Date(year, month - 1, day),
        };
      });
    },
  };
});

export const projectLogsAtom = atomWithQuery<LogType[]>((get) => {
  return {
    queryKey: ['log', get(pageProjectIdAtom)],
    queryFn: async ({ queryKey: [, projectId] }) => {
      if (!projectId) {
        return [];
      }

      const res = await fetch(`/api/log?projectId=${projectId}`);
      const data = await res.json();
      return data.map((item: any) => {
        const [year, month, day] = item.date.split('-');
        return {
          ...item,
          date: item.date && new Date(year, month - 1, day),
        };
      });
    },
  };
});

export const logMutation = atomWithMutation<LogType, Partial<LogType>>(
  (get) => ({
    mutationKey: ['log'],
    mutationFn: async ({ id, project, date, ...log }) => {
      try {
        const res = await fetch(`/api/log${id ? '/' + id : ''}`, {
          method: id ? 'PATCH' : 'POST',
          body: JSON.stringify({ ...log, date: getDashDate(date) }),
        });
        return await res.json();
      } catch (error) {
        throw error;
      }
    },
    onMutate: (data) => {
      updateAtom(data, ['log', get(todayAtom)]);
    },
    onSuccess: (data) => {
      get(logsTodayAtom).refetch();
    },
  })
);

export const editingLogAtom = atom<Partial<LogType> | null>(null);
export const logFormDataAtom = atom(
  (get) => {
    const log = get(editingLogAtom);
    return log;
  },
  (get, set, update: Partial<LogType> | null) => {
    set(editingLogAtom, update);
  }
);
