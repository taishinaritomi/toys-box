import type { FC } from "react";
import { useState } from "react";
import TextareaAutoSize from 'react-textarea-autosize';
import type { TaskType } from "../states/tasksState";
import { TaskTextSchema } from "../states/tasksState";
import { useTasksMutators } from "../states/tasksState";
import TaskMenu from "./TaskMenuPopover";

const TaskContent:FC<{task:TaskType}> = ({task}) => {
  const { updateTask, removeTask } = useTasksMutators();
  const [focus, setFocus] = useState(false);

  return (
    <div className={`flex gap-4 p-4 bg-slate-100 rounded-md border-2 border-slate-200 ${focus ? 'border-purple-600':''}`}>
      <TextareaAutoSize
        className="overflow-hidden p-2 w-full bg-slate-100 focus:outline-none resize-none"
        onChange={(e) =>
          updateTask(task.id, {
            text: e.target.value,
            updateAt: new Date()
          })
        }
        onFocus={() => setFocus(true)}
        onBlur={(e) => {
          try {
            TaskTextSchema.parse({text: e.target.value});
          } catch (e) {
            removeTask(task.id)
          }
          setFocus(false)
        }}
        defaultValue={task.text}
      />
      <TaskMenu task={task} />
    </div>
  )
}
export default TaskContent;
