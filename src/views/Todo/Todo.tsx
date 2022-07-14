import { TaskForm } from './components/TaskForm';
import { TasksList } from './components/TasksList';

export const Todo = () => {
  return (
    <div className='mx-auto flex max-w-2xl flex-col gap-8 p-4'>
      <TaskForm />
      <TasksList />
    </div>
  );
};
