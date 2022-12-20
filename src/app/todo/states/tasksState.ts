import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { z } from 'zod';
import type { PartialSetStateAction } from '@/hooks/useObjectArray';
import { useObjectArray } from '@/hooks/useObjectArray';

const taskTextRegex = /\S/g;

const TaskSchema = z.object({
  id: z.string(),
  text: z.string().min(1).regex(taskTextRegex),
  checked: z.boolean(),
  createAt: z.string(),
  updateAt: z.string(),
});
export type TaskType = z.infer<typeof TaskSchema>;

const TasksSchema = z.array(TaskSchema);
export type TasksType = z.infer<typeof TasksSchema>;

export const TaskTextSchema = TaskSchema.pick({ text: true });
export type TaskTextType = z.infer<typeof TaskTextSchema>;

const tasksState = atomWithStorage<TasksType>('tasks', []);

export const useTaskState = () => {
  const [tasks] = useAtom(tasksState);

  const findById = useCallback(
    (id: string) => {
      const task = tasks.find((task) => task.id === id) || null;
      return task;
    },
    [tasks],
  );

  return { tasks, findById };
};

export const useTasksMutators = () => {
  const [, setTasks] = useAtom(tasksState);

  const {
    add,
    update,
    remove: removeTask,
    move: moveTask,
  } = useObjectArray(setTasks);

  const addTask = (addTask: Pick<TaskType, 'text'>) => {
    const now = new Date();
    add({
      id: nanoid(),
      createAt: now.toString(),
      updateAt: now.toString(),
      checked: false,
      ...addTask,
    });
  };

  const updateTask = (
    id: string,
    updateTask: PartialSetStateAction<TaskType>,
  ) => {
    update(id, Object.assign({ updateAt: new Date().toString() }, updateTask));
  };

  const removeAllTask = () => setTasks([]);

  return {
    addTask,
    moveTask,
    updateTask,
    removeTask,
    removeAllTask,
  };
};
