'use client';

import OverlayForm from '@/components/overlay/OverlayForm';
import {
  projectFormDataAtom,
  projectMutation,
  StatusType,
} from '@/store/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useAtomValue } from 'jotai';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import StatusTab from './StatusTab';
import { CheckCircle } from '../content/CheckTable';

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  defaultGoal: z.number(),
  status: z.string(),
});

export type projectFormSchemaType = z.infer<typeof formSchema>;

const ProjectInputOverlay = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [defaultValue, setDefaultValue] = useAtom(projectFormDataAtom);
  const { mutate, isPending } = useAtomValue(projectMutation);

  const [error, setError] = useState('');

  const params = useSearchParams();
  const showProjectInput = params.get('project-input');

  const form = useForm<projectFormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const submitHandler = async (values: projectFormSchemaType) => {
    console.log(values);
    setError('');

    try {
      await mutate({
        ...values,
        id: defaultValue?.id || undefined,
      });

      router.back();
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      } else if ((error as Error)?.message) {
        setError((error as Error).message);
      }
      throw error;
    }
  };

  useEffect(() => {
    if (showProjectInput) {
      setError('');
      form.reset();

      if (!defaultValue) {
        form.reset();
        form.setValue(
          'status',
          pathname.includes('todo') ? 'todo' : 'in-progress'
        );
        form.setValue('defaultGoal', 5);
      } else {
        for (const keyStr in defaultValue) {
          const key = keyStr as keyof projectFormSchemaType;
          form.setValue(key, defaultValue[key]);
        }
      }
    } else {
      setDefaultValue(null);
    }
  }, [showProjectInput]);

  return (
    <OverlayForm<projectFormSchemaType>
      id="project-input"
      form={form}
      onSubmit={submitHandler}
      isRight={true}
      disableReset={true}
      disalbeBackOnSubmit={true}
      className="flex flex-col items-center gap-4 text-sm"
      isPending={isPending}
    >
      <input
        className="text-lg w-full font-light bg-gray-100 p-2 rounded-lg"
        placeholder="Enter the title"
        {...form.register('title')}
        disabled={isPending}
      />
      <div className="flex flex-col items-center gap-2 my-4 max-w-40 w-full">
        <label htmlFor="defaultGoal" className="font-extrabold text-sm">
          Default Count Goal
        </label>
        <div className="flex gap-8 text-xl text-gray-400">
          <button
            type="button"
            onClick={() => {
              const prev = +form.getValues('defaultGoal');
              form.setValue('defaultGoal', prev > 0 ? prev - 1 : 0);
            }}
          >
            -
          </button>
          <input
            id="defaultGoal"
            type="number"
            className="text-4xl field-sizing-content text-primary"
            {...form.register('defaultGoal')}
          />
          <button
            type="button"
            onClick={() => {
              form.setValue('defaultGoal', form.getValues('defaultGoal') + 1);
            }}
          >
            +
          </button>
        </div>
        <div className="flex gap-1 flex-wrap">
          {Array.from(new Array(form.watch('defaultGoal'))).map((_, i) => (
            <CheckCircle key={i} checked={false} />
          ))}
        </div>
      </div>
      <StatusTab
        status={form.getValues('status') as StatusType}
        setStatus={(status: StatusType) => {
          form.setValue('status', status);
        }}
      />
      {!!Object.keys(form.formState.errors).length && (
        <div className="space-y-2 my-2">
          {Object.keys(form.formState.errors).map((key) => (
            <div
              key={key}
              className="w-full p-2 px-4 text-sm bg-red-50 text-red-400 font-bold text-center rounded-lg"
            >
              {(
                form.formState.errors[key as keyof projectFormSchemaType]
                  ?.message as string
              )
                ?.split('\n')
                .map((line, i) => (
                  <p key={i}>
                    <strong>{key}: </strong>
                    {line}
                  </p>
                ))}
            </div>
          ))}
        </div>
      )}
    </OverlayForm>
  );
};

export default ProjectInputOverlay;
