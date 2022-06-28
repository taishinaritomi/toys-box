import { useState, useEffect } from "react";
import useTasks from "../hooks/useTasks";
import TaskContent from "./TaskContent";

const TasksList = () => {
  const { tasks  } = useTasks();
    const[lording,setLording] = useState(true);
    useEffect(() => {setLording(false)},[])
  return (
    <ul className="flex flex-col gap-4">
      {!lording && (
        <>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskContent task={task} />
            </li>
          ))}
        </>
      )}
    </ul>
  )
}

export default TasksList;
