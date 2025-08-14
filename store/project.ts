import { projectFormSchemaType } from '@/app/(screens)/_components/form/ProjectInputOverlay';
import { updateAtom } from '@/util/query';
import { atom } from 'jotai';
import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query';

export interface ProjectType {
  id: string;
  title: string;
  status: StatusType;
  defaultGoal: number;
}

export type StatusType = 'todo' | 'in-progress' | 'completed' | 'archived';

export const ProjectAtom = atomWithQuery<ProjectType[]>(() => {
  return {
    queryKey: ['project'],
    queryFn: async () => {
      const res = await fetch(`/api/project`);
      const data = await res.json();
      return data;
    },
  };
});

export const ProjectInProgressAtom = atomWithQuery<ProjectType[]>((get) => {
  return {
    queryKey: ['project-in-progress'],
    queryFn: async () => {
      const projects = get(ProjectAtom);
      return (
        projects.data?.filter(({ status }) => status === 'in-progress') || []
      );
    },
  };
});

export const ProjectTodoAtom = atomWithQuery<ProjectType[]>((get) => {
  return {
    queryKey: ['project-todo'],
    queryFn: async () => {
      const projects = get(ProjectAtom);
      return projects.data?.filter(({ status }) => status === 'todo') || [];
    },
  };
});

export const ProjectCompletedAtom = atomWithQuery<ProjectType[]>((get) => {
  return {
    queryKey: ['project-completed'],
    queryFn: async () => {
      const projects = get(ProjectAtom);
      return (
        projects.data?.filter(({ status }) => status === 'completed') || []
      );
    },
  };
});

export const ProjectArchivedAtom = atomWithQuery<ProjectType[]>((get) => {
  return {
    queryKey: ['project-archived'],
    queryFn: async () => {
      const projects = get(ProjectAtom);
      return projects.data?.filter(({ status }) => status === 'archived') || [];
    },
  };
});

export const projectMutation = atomWithMutation<
  ProjectType,
  Partial<projectFormSchemaType>
>((get) => ({
  mutationKey: ['project'],
  mutationFn: async (project) => {
    try {
      const res = await fetch(
        `/api/project${project.id ? '/' + project.id : ''}`,
        {
          method: project.id ? 'PATCH' : 'POST',
          body: JSON.stringify(project),
        }
      );
      return await res.json();
    } catch (error) {
      throw error;
    }
  },
  onSuccess: (data) => {
    updateAtom(data, 'project');
    get(ProjectTodoAtom).refetch();
    get(ProjectInProgressAtom).refetch();
    get(ProjectCompletedAtom).refetch();
    get(ProjectArchivedAtom).refetch();
  },
}));

export const currentProjectAtom = atom<Partial<ProjectType> | null>(null);
export const projectFormDataAtom = atom(
  (get) => {
    const project = get(currentProjectAtom);
    return project;
  },
  (get, set, update: Partial<ProjectType> | null) => {
    set(currentProjectAtom, update);
  }
);
