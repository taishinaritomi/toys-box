"use client";

export const TodoView = () => {
  return (
    <>
    {typeof window !== 'undefined' && (
      <>
        <div>tasks:{window?.localStorage.getItem('tasks')}</div>
        <div>task:{window?.localStorage.getItem('task')}</div>
        <div>todo:{window?.localStorage.getItem('todo')}</div>
        <div>todos:{window?.localStorage.getItem('todos')}</div>
      </>
    )}
    </>
  );
};
