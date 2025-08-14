'use client';

import OverlayForm from '@/components/overlay/OverlayForm';
import { projectDeletion, projectFormDataAtom } from '@/store/project';
import { removeAtom } from '@/util/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCircleExclamation } from 'react-icons/fa6';
import * as z from 'zod';
const formSchema = z.object({});

type schemaType = z.infer<typeof formSchema>;

const ProjectDeleteConformOverlay = () => {
  const router = useRouter();

  const targetProject = useAtomValue(projectFormDataAtom);
  const { mutate: deleteProject, isPending } = useAtomValue(projectDeletion);

  const form = useForm<schemaType>({
    resolver: zodResolver(formSchema),
  });

  const submitHandler = async () => {
    if (targetProject?.id) {
      deleteProject(targetProject.id);
      router.back();
      router.back();
    }
  };

  return (
    <OverlayForm<schemaType>
      id="project-delete"
      form={form}
      onSubmit={submitHandler}
      isPending={isPending}
      saveStr="Delete"
      className="flex flex-col items-center text-center py-6"
    >
      <FaCircleExclamation className="text-3xl" />
      <h3 className="text-2xl font-extrabold mb-3">Are you sure?</h3>
      <p className="leading-tight">
        Are you sure you want to delete project? <br />
        All related logs will be removed and this process cannot be undone.{' '}
        <br />
      </p>
    </OverlayForm>
  );
};

export default ProjectDeleteConformOverlay;
