import { atom } from "recoil";
import { z } from "zod";
import { localStorageEffect } from "../../../libs/recoil";

const Task = z.object({
  id: z.string(),
  text: z.string(),
  checked: z.boolean(),
  createAt: z.date(),
  updateAt: z.date()
})

const Tasks = z.array(Task);

export type TaskType = z.infer<typeof Task>;


export const tasksState = atom<TaskType[]>({
  key: 'tasks',
  default: [],
  effects:[localStorageEffect('tasks',(tasks) => {
    const changeType = tasks.map((task) => ({...task,createAt: new Date(task.createAt),updateAt: new Date(task.updateAt)}));
    return Tasks.parse(changeType)
  })]
});
