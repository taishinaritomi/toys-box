import { nanoid } from 'nanoid';
import { useRecoilState } from 'recoil';
import { tasksState, type TaskType } from '../states/tasksState';
import useObjectArrayUpdater from '~/hooks/useObjectArrayUpdater';

type UpdateTask = Partial<Pick<TaskType, 'text' | 'checked'>>;


const useTasks = () => {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const {add:taskAdd,update:taskUpdate,remove, move } = useObjectArrayUpdater(setTasks);

  const add = (addTask: Pick<TaskType, 'text'>) => {
    const now =  new Date()
    taskAdd({ id: nanoid(), createAt: now, updateAt: now,checked:false, ...addTask });
  };

  const update = (id: string, updateTask: UpdateTask | (UpdateTask | ((prevValue: UpdateTask) => UpdateTask))) => {
    taskUpdate(id,(task) => {
      const _updateTask = updateTask instanceof Function ? updateTask(task): updateTask;
      return { updateAt: new Date(),..._updateTask };
    });
  };

  const removeAll = () => {
    setTasks([]);
  };

  const findById = (id:string) => {
    const task = tasks.find((task) => task.id === id) || null;
    return task;
  };

  return {
    tasks,
    setTasks,
    add,
    move,
    update,
    remove,
    removeAll,
    findById
  };
};
export default useTasks;
