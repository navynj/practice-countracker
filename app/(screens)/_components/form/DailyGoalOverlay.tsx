import OverlayForm from '@/components/overlay/OverlayForm';
import { logFormDataAtom, logMutation } from '@/store/log';
import { todayAtom } from '@/store/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CountInput from './CountInput';
import { logFormSchema, LogType } from '@/types/data';

const DailyGoalOverlay = () => {
  const router = useRouter();

  const [defaultValue, setDefaultValue] = useAtom(logFormDataAtom);

  const { mutate, isPending } = useAtomValue(logMutation);
  const today = useAtomValue(todayAtom);

  const [error, setError] = useState('');

  const params = useSearchParams();
  const showGoalInput = params.get('daily-goal');

  const form = useForm<LogType>({
    resolver: zodResolver(logFormSchema),
  });

  const submitHandler = async ({ date, ...values }: LogType) => {
    setError('');

    try {
      await mutate(values);

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
    if (showGoalInput) {
      setError('');
      form.reset();

      if (!defaultValue) {
        form.reset();
      } else {
        for (const keyStr in defaultValue) {
          const key = keyStr as keyof LogType;
          if (defaultValue[key]) {
            form.setValue(key, defaultValue[key]);
          }
        }
      }
    } else {
      setDefaultValue(null);
    }
  }, [showGoalInput]);

  return (
    <OverlayForm<LogType>
      id="daily-goal"
      form={form}
      onSubmit={submitHandler}
      className="flex flex-col items-center gap-4 text-sm"
      isPending={isPending}
    >
      <h1 className="text-center text-3xl font-extrabold">
        {defaultValue?.project?.title}
      </h1>
      <CountInput
        title={dayjs(today).format('YYYY. MM. DD. (ddd)')}
        form={form}
        fieldName="goal"
      />
      {!!Object.keys(form.formState.errors).length && (
        <div className="space-y-2 my-2">
          {Object.keys(form.formState.errors).map((key) => (
            <div
              key={key}
              className="w-full p-2 px-4 text-sm bg-red-50 text-red-400 font-bold text-center rounded-lg"
            >
              {(form.formState.errors[key as keyof LogType]?.message as string)
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

export default DailyGoalOverlay;
