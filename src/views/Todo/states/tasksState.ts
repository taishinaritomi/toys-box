import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { z } from 'zod';
import type { PartialSetStateAction } from '@/hooks/useObjectArrayMutators';
import { useObjectArrayMutators } from '@/hooks/useObjectArrayMutators';
import { localStorageEffect } from '@/libs/recoil';

const taskTextRegex = /\S/g;

const TaskSchema = z.object({
  id: z.string(),
  text: z.string().min(1).regex(taskTextRegex),
  checked: z.boolean(),
  createAt: z.date(),
  updateAt: z.date(),
});
export type TaskType = z.infer<typeof TaskSchema>;

const TasksSchema = z.array(TaskSchema);
export type TasksType = z.infer<typeof TasksSchema>;

export const TaskTextSchema = TaskSchema.pick({ text: true });
export type TaskTextType = z.infer<typeof TaskTextSchema>;

export const tasksState = atom<TasksType>({
  key: 'tasksState',
  default: [],
  effects: [
    localStorageEffect('tasks', (tasks) => {
      const changeType = tasks.map((task) => ({
        ...task,
        createAt: new Date(task.createAt),
        updateAt: new Date(task.updateAt),
      }));
      try {
        return TasksSchema.parse(changeType);
      } catch (error) {
        return [];
      }
    }),
  ],
});

export const useTaskState = () => {
  const tasks = useRecoilValue(tasksState);

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
  const setTasks = useSetRecoilState(tasksState);

  const {
    add,
    update,
    remove: removeTask,
    move: moveTask,
  } = useObjectArrayMutators(setTasks);

  const addTask = (addTask: Pick<TaskType, 'text'>) => {
    const now = new Date();
    add({
      id: nanoid(),
      createAt: now,
      updateAt: now,
      checked: false,
      ...addTask,
    });
  };

  const updateTask = (
    id: string,
    updateTask: PartialSetStateAction<TaskType>,
  ) => {
    update(id, updateTask);
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
