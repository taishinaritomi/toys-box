import type { FC } from "react"
import TextareaAutoSize from 'react-textarea-autosize';
import useTasks from "../hooks/useTasks";
import type { TaskType } from "../states/tasksState";

const TaskContent:FC<{task:TaskType}> = ({task}) => {
  const { update, remove } = useTasks();
  return (
    <div className="flex gap-4 p-4 bg-slate-100 rounded-md border border-slate-200">
      <TextareaAutoSize
        className="overflow-hidden p-3 w-full bg-slate-100 focus:outline-none resize-none"
        onChange={(e) =>
          update(task.id, {
            text: e.target.value,
          })
        }
        onBlur={(e) =>
          (!e.target.value || !e.target.value.match(/\S/g)) &&
          remove(task.id)
        }
        defaultValue={task.text}
      />
      {/* <input
        onChange={(e) =>
          update(task.id, {
            text: e.target.value,
          })
        }
        onBlur={(e) =>
          (!e.target.value || !e.target.value.match(/\S/g)) &&
          remove(task.id)
        }
        defaultValue={task.text}
      /> */}
      {/* <p>create:{new Date(task.createAt).toLocaleString()}</p>
      <p>update:{new Date(task.updateAt).toLocaleString()}</p> */}
      <button onClick={() => remove(task.id)}>remove</button>
    </div>
  )
}
export default TaskContent;
