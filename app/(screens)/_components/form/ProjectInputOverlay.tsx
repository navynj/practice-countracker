'use client';

import OverlayForm from '@/components/overlay/OverlayForm';
import { projectFormDataAtom, projectMutation } from '@/store/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useAtomValue } from 'jotai';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaTrash } from 'react-icons/fa6';
import CountInput from './CountInput';
import StatusTab from './StatusTab';
import { projectFormSchema, ProjectType, StatusType } from '@/types/data';

const ProjectInputOverlay = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [defaultValue, setDefaultValue] = useAtom(projectFormDataAtom);
  const { mutate, isPending } = useAtomValue(projectMutation);

  const [error, setError] = useState('');

  const params = useSearchParams();
  const showProjectInput = params.get('project-input');
  const status = params.get('status');

  const form = useForm<ProjectType>({
    resolver: zodResolver(projectFormSchema),
  });

  const submitHandler = async (values: ProjectType) => {
    setError('');

    try {
      await mutate({
        ...values,
        id: defaultValue?.id || undefined,
        createdAt: defaultValue?.createdAt
          ? defaultValue.createdAt
          : new Date().toISOString(),
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
          pathname.includes('todo') ? 'todo' : (status as StatusType) || 'todo'
        );
        form.setValue('defaultGoal', 5);
      } else {
        for (const keyStr in defaultValue) {
          const key = keyStr as keyof ProjectType;
          form.setValue(key, defaultValue[key]);
        }
      }
    } else {
      setDefaultValue(null);
    }
  }, [showProjectInput]);

  return (
    <OverlayForm<ProjectType>
      id="project-input"
      form={form}
      onSubmit={submitHandler}
      className="flex flex-col items-center gap-4 text-sm"
      isPending={isPending}
    >
      <StatusTab
        status={form.watch('status') as StatusType}
        setStatus={(status: StatusType) => {
          form.setValue('status', status);
        }}
      />
      <input
        className="text-lg w-full font-light bg-gray-100 p-2 rounded-lg"
        placeholder="Enter the title"
        {...form.register('title')}
        disabled={isPending}
      />
      <CountInput
        title="Default Count Goal"
        form={form}
        fieldName="defaultGoal"
      />
      {defaultValue && !isPending && (
        <div className="max-w-[50%] w-full flex justify-between items-center gap-1 [&>*]:w-full [&>*]:py-2 font-extrabold text-xs text-gray-400">
          <Link
            href={`${pathname}?${params.toString()}&project-delete=show`}
            className="flex justify-center items-center gap-2 text-red-400"
          >
            <FaTrash /> <span>Delete</span>
          </Link>
          <Link
            href={`/project/${defaultValue.id}${
              defaultValue.title
                ? `?title=${encodeURIComponent(defaultValue.title || '')}`
                : ''
            }`}
            className="block w-full flex justify-center items-center gap-2"
          >
            <FaEye /> <span>View Detail</span>
          </Link>
        </div>
      )}
      {!!Object.keys(form.formState.errors).length && (
        <div className="space-y-2 my-2">
          {Object.keys(form.formState.errors).map((key) => (
            <div
              key={key}
              className="w-full p-2 px-4 text-sm bg-red-50 text-red-400 font-bold text-center rounded-lg"
            >
              {(
                form.formState.errors[key as keyof ProjectType]
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
          {error && (
            <div className="w-full p-2 px-4 text-sm bg-red-50 text-red-400 font-bold text-center rounded-lg">
              {error}
            </div>
          )}
        </div>
      )}
    </OverlayForm>
  );
};

export default ProjectInputOverlay;
