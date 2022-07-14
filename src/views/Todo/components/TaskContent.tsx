import type { FC } from 'react';
import { useState } from 'react';
import TextareaAutoSize from 'react-textarea-autosize';
import type { TaskType } from '../states/tasksState';
import { TaskTextSchema } from '../states/tasksState';
import { useTasksMutators } from '../states/tasksState';
import { TaskMenu } from './TaskMenuPopover';

export const TaskContent: FC<{ task: TaskType }> = ({ task }) => {
  const { updateTask, removeTask } = useTasksMutators();
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={`flex gap-4 rounded-md border border-slate-200 bg-slate-100 p-4 transition-shadow ${
        focus ? 'shadow-lg' : ''
      }`}
    >
      <TextareaAutoSize
        className='w-full resize-none overflow-hidden bg-slate-100 p-2 focus:outline-none'
        onChange={(e) =>
          updateTask(task.id, {
            text: e.target.value,
            updateAt: new Date(),
          })
        }
        onFocus={() => setFocus(true)}
        onBlur={(e) => {
          try {
            TaskTextSchema.parse({ text: e.target.value });
          } catch (e) {
            removeTask(task.id);
          }
          setFocus(false);
        }}
        defaultValue={task.text}
      />
      <TaskMenu task={task} />
    </div>
  );
};
