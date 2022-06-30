import TaskForm from "./components/TaskForm";
import TasksList from "./components/TasksList";

const Todo = () => {
  return (
    <div className="flex flex-col gap-8 p-4 mx-auto max-w-2xl">
      <TaskForm />
      <TasksList />
    </div>
  )
}
export default Todo;
