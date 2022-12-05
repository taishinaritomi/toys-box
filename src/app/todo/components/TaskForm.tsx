'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { IoRocket } from 'react-icons/io5';
import TextareaAutoSize from 'react-textarea-autosize';
import type { TaskTextType } from '../states/tasksState';
import { useTasksMutators } from '../states/tasksState';
import { TaskTextSchema } from '../states/tasksState';

export const TaskForm = () => {
  const { addTask } = useTasksMutators();
  const [composing, setComposition] = useState(false);
  const [focus, setFocus] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleFormSubmit: SubmitHandler<TaskTextType> = (task) => {
    addTask(task);
    reset();
  };

  const { register, handleSubmit, reset } = useForm<TaskTextType>({
    mode: 'onSubmit',
    resolver: zodResolver(TaskTextSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, () => reset())}
      className=' mx-auto w-full max-w-lg'
    >
      <div
        className={`relative flex items-end rounded-xl border border-slate-200 bg-slate-100 transition-shadow ${
          focus ? 'shadow-lg' : ''
        }`}
      >
        <TextareaAutoSize
          onCompositionStart={() => setComposition(true)}
          onCompositionEnd={() => setComposition(false)}
          {...register('text')}
          onFocus={() => setFocus(true)}
          onBlur={(e) => {
            register('text').onBlur(e);
            setFocus(false);
          }}
          onKeyDown={(e) => {
            if (e.shiftKey && e.code === 'Enter') {
              if (composing) return;
              e.preventDefault();
              buttonRef?.current?.click();
            }
          }}
          className='m-3 h-8 w-full resize-none overflow-hidden rounded-xl bg-slate-100 p-1 focus:outline-none'
        />
        <div className='m-3'>
          <button
            className='rounded-xl bg-purple-600 p-2 text-white'
            ref={buttonRef}
          >
            <IoRocket />
          </button>
        </div>
      </div>
    </form>
  );
};
