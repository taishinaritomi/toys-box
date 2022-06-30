import type { FormEventHandler} from "react";
import { useRef} from "react";
import { useState } from "react";
import { IoRocket } from "react-icons/io5";
import TextareaAutoSize from 'react-textarea-autosize';
import useTasks from "../hooks/useTasks";

const TaskForm = () => {
  const { add } = useTasks();
  const [inputTask, setInputTask] = useState('');
  const [composing, setComposition] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleFormSubmit:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    if (!inputTask || !inputTask.match(/\S/g)) return;
    add({ text: inputTask });
    setInputTask('');
  }


  return (
    <form onSubmit={handleFormSubmit} className=' mx-auto w-full max-w-lg'>
      <div className="flex relative items-center bg-slate-100 rounded-md border border-slate-200">
        <TextareaAutoSize
          onCompositionStart={() => setComposition(true)}
          onCompositionEnd={() => setComposition(false)}
          onChange={(e) => setInputTask(e.currentTarget.value)}
          onKeyDown={(e) => {
            if(e.shiftKey && e.code === 'Enter') {
              if(composing) return;
              e.preventDefault()
              buttonRef?.current?.click();
            }
          }}
          className='overflow-hidden p-3 w-full bg-slate-100 rounded-md focus:outline-none resize-none'
        />
        <button
          ref={buttonRef}
          className='p-2 mx-3 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-md border transition-colors'
        >
          <IoRocket />
        </button>
      </div>
    </form>
  )
}

export default TaskForm;
