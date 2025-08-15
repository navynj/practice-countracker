import * as z from 'zod';

export type StatusType = 'todo' | 'in-progress' | 'completed' | 'archived';

export const projectFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  defaultGoal: z.number(),
  status: z.custom<StatusType>(),
  createdAt: z.string().optional(),
});

export type ProjectType = z.infer<typeof projectFormSchema>;

export const logFormSchema = z.object({
  id: z.string(),
  count: z.number(),
  goal: z.number(),
  date: z.date(),
  project: projectFormSchema,
  projectId: z.string(),
  userId: z.string(),
  createdAt: z.string(),
});

export type LogType = z.infer<typeof logFormSchema>;
