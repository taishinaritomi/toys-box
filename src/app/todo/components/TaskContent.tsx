import type { FC } from 'react';
import TextareaAutoSize from 'react-textarea-autosize';
import type { TaskType } from '../states/tasksState';
import { TaskTextSchema } from '../states/tasksState';
import { useTasksMutators } from '../states/tasksState';
import { TaskMenu } from './TaskMenuPopover';

type Props = {
  task: TaskType;
  overlay: boolean;
  dragId: string | null;
};

export const TaskContent: FC<Props> = ({ task, dragId, overlay }) => {
  const { updateTask, removeTask } = useTasksMutators();

  return (
    <div
      className={`flex gap-4 rounded-xl border border-slate-200 bg-slate-100 p-4 transition-shadow focus:shadow-lg ${
        task.checked ? 'bg-green-100' : ''
      } ${dragId === task.id && overlay ? 'shadow-xl' : ''}`}
    >
      <TextareaAutoSize
        className={`w-full resize-none overflow-hidden bg-slate-100 p-2 focus:outline-none ${
          task.checked ? 'bg-green-100' : ''
        }`}
        onChange={(e) =>
          updateTask(task.id, {
            text: e.target.value,
          })
        }
        onBlur={(e) => {
          try {
            TaskTextSchema.parse({ text: e.target.value });
          } catch (e) {
            removeTask(task.id);
          }
        }}
        defaultValue={task.text}
      />
      <TaskMenu task={task} />
    </div>
  );
};
