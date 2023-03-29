import { Popover, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { type FC, Fragment } from 'react';
import {
  IoEllipsisVertical,
  IoCheckmark,
  IoTrash,
  IoRefresh,
} from 'react-icons/io5';
import { type TaskType, useTasksMutators } from '../states/tasksState';
import 'dayjs/locale/ja';
dayjs.extend(relativeTime);
dayjs.locale('ja');

export const TaskMenu: FC<{ task: TaskType }> = ({ task }) => {
  const { removeTask, updateTask } = useTasksMutators();
  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
          <Popover.Button className='rounded-xl px-2 py-3'>
            <IoEllipsisVertical />
          </Popover.Button>
          <Transition
            show={open}
            as={Fragment}
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Popover.Panel
              static
              className='absolute right-full top-0 -translate-x-3'
            >
              <div className='s:w-48 w-52 rounded-xl border border-slate-200 bg-slate-100 p-2 shadow-md'>
                <button
                  onClick={() =>
                    updateTask(task.id, ({ checked }) => ({
                      updateAt: new Date().toString(),
                      checked: !checked,
                    }))
                  }
                  className={`flex w-full items-center gap-2 rounded-xl px-3  py-2 transition-colors ${
                    task.checked
                      ? 'bg-green-100 font-bold text-green-400 hover:text-green-500'
                      : 'text-slate-600'
                  }`}
                >
                  <IoCheckmark />
                  <p>{task.checked ? '完了' : '未完了'}</p>
                </button>
                <button
                  onClick={() => removeTask(task.id)}
                  className='flex w-full items-center gap-2 rounded-xl px-3 py-2 font-bold text-red-400 transition-colors hover:bg-red-100 hover:text-red-500'
                >
                  <IoTrash />
                  <p>削除</p>
                </button>
                <div className='flex w-full items-center gap-2 px-3 py-2 text-slate-600'>
                  <IoRefresh />
                  <p>{dayjs(task.updateAt).fromNow()}に更新</p>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
