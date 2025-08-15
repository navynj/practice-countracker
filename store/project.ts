import { getDashDate } from '@/util/date';
import { removeAtom, updateAtom } from '@/util/query';
import { atom } from 'jotai';
import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query';
import { logsTodayAtom } from './log';
import { pageProjectIdAtom, todayAtom } from './ui';
import { ProjectType } from '@/types/data';

export const projectAtom = atomWithQuery<ProjectType[]>(() => {
  return {
    queryKey: ['project'],
    queryFn: async () => {
      const res = await fetch(`/api/project`);
      const data = await res.json();
      return data;
    },
  };
});

export const projectInProgressAtom = atomWithQuery<ProjectType[]>((get) => {
  const { data } = get(projectAtom);
  return {
    queryKey: ['project-in-progress', get(projectAtom)],
    queryFn: async () => {
      return data?.filter(({ status }) => status === 'in-progress') || [];
    },
  };
});

export const projectTodoAtom = atomWithQuery<ProjectType[]>((get) => {
  const { data } = get(projectAtom);
  return {
    queryKey: ['project-todo', get(projectAtom)],
    queryFn: async () => {
      return data?.filter(({ status }) => status === 'todo') || [];
    },
  };
});

export const projectCompletedAtom = atomWithQuery<ProjectType[]>((get) => {
  const { data } = get(projectAtom);
  return {
    queryKey: ['project-completed', get(projectAtom)],
    queryFn: async () => {
      return data?.filter(({ status }) => status === 'completed') || [];
    },
  };
});

export const pageProjectAtom = atomWithQuery<ProjectType>((get) => {
  return {
    queryKey: ['project', get(pageProjectIdAtom)],
    queryFn: async ({ queryKey: [, projectId] }) => {
      const res = await fetch(`/api/project/${projectId}`);
      const data = await res.json();
      return data;
    },
  };
});

export const projectArchivedAtom = atomWithQuery<ProjectType[]>((get) => {
  const { data } = get(projectAtom);
  return {
    queryKey: ['project-archived'],
    queryFn: async () => {
      return data?.filter(({ status }) => status === 'archived') || [];
    },
  };
});

export const projectMutation = atomWithMutation<
  ProjectType,
  Partial<ProjectType>
>((get) => ({
  mutationKey: ['project'],
  mutationFn: async ({ id, createdAt, ...project }) => {
    try {
      const today = getDashDate(get(todayAtom));
      const res = await fetch(
        `/api/project${id ? '/' + id : ''}${
          project.status === 'in-progress' ? `?date=${today}` : ''
        }`,
        {
          method: id ? 'PATCH' : 'POST',
          body: JSON.stringify(project),
        }
      );
      return await res.json();
    } catch (error) {
      throw error;
    }
  },
  onMutate: (data) => {
    updateAtom(data, 'project');

    const { data: logs } = get(logsTodayAtom);
    const log = logs?.find(({ projectId }) => projectId === data.id);
    if (log) {
      if (data.status === 'in-progress') {
        updateAtom(
          {
            ...log,
            projectId: data.id,
            project: { ...data },
            goal: data.defaultGoal,
          },
          ['log', get(todayAtom)]
        );
      } else {
        removeAtom(log.id, ['log', get(todayAtom)]);
      }
    } else {
      updateAtom(
        {
          id: data.id,
          projectId: data.id,
          project: { ...data },
          goal: data.defaultGoal,
          count: 0,
        },
        ['log', get(todayAtom)]
      );
    }
  },
  onSuccess: (data) => {
    get(projectAtom).refetch();
    get(logsTodayAtom).refetch();
  },
}));

export const projectDeletion = atomWithMutation<ProjectType, string>((get) => ({
  mutationKey: ['project'],
  mutationFn: async (id) => {
    try {
      const res = await fetch(`/api/project/${id}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (error) {
      throw error;
    }
  },
  onMutate: (id) => {
    removeAtom(id, 'project');

    const { data: logs } = get(logsTodayAtom);
    const log = logs?.find(({ projectId }) => projectId === id);
    if (log) {
      removeAtom(log.id, ['log', get(todayAtom)]);
    }
  },
  onSuccess: (data) => {
    get(projectAtom).refetch();
    get(logsTodayAtom).refetch();
  },
}));

export const editingProjectAtom = atom<Partial<ProjectType> | null>(null);
export const projectFormDataAtom = atom(
  (get) => {
    const project = get(editingProjectAtom);
    return project;
  },
  (get, set, update: Partial<ProjectType> | null) => {
    set(editingProjectAtom, update);
  }
);
