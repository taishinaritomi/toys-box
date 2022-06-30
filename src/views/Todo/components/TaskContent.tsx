import { Popover, Transition } from "@headlessui/react";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import type { FC} from "react";
import { Fragment } from "react"
import { IoRefresh, IoBug, IoTrash } from "react-icons/io5";
import TextareaAutoSize from 'react-textarea-autosize';
import useTasks from "../hooks/useTasks";
import type { TaskType } from "../states/tasksState";
import 'dayjs/locale/ja';

dayjs.extend(relativeTime)
dayjs.locale('ja');

const TaskContent:FC<{task:TaskType}> = ({task}) => {
  const { update, remove } = useTasks();
  return (
    <div className="flex gap-4 items-center p-4 bg-slate-100 rounded-md border">
      <TextareaAutoSize
        className="overflow-hidden p-2 w-full bg-slate-100 focus:outline-none resize-none"
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
      <TaskMenu task={task} />
    </div>
  )
}
export default TaskContent;

const TaskMenu:FC<{task:TaskType}> = ({task}) => {
  const { remove } = useTasks();
  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
          <Popover.Button className='p-2 rounded-md '><IoBug /></Popover.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel static className='absolute top-0 right-full -translate-x-3'>
                <div className="p-2 w-52 bg-slate-100 rounded-md border border-slate-200 shadow-md s:w-48">
                  <button
                    onClick={() => remove(task.id)}
                    className="flex gap-2 items-center py-2 px-3 w-full font-bold text-red-400 hover:text-red-500 hover:bg-red-100 rounded-md transition-colors"
                  >
                    <IoTrash />
                    <p>削除</p>
                  </button>
                  <div className="flex gap-2 items-center py-2 px-3 w-full text-slate-600">
                    <IoRefresh />
                    <p>{dayjs(task.updateAt).fromNow()}に更新</p>
                  </div>
                </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
