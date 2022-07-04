import type {
  DragEndEvent,
  DragStartEvent,
  MeasuringConfiguration,
} from '@dnd-kit/core';
import { MeasuringStrategy } from '@dnd-kit/core';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';
import {
  IoEllipsisVertical,
  IoSync,
  IoSwapVertical,
  IoChevronDown,
  IoChevronUp,
} from 'react-icons/io5';
import Sortable from '~/components/Dndkit/Sortable';
import SortableHandle from '~/components/Dndkit/SortableHandle';

type Fruits = {
  id: string;
  name: string;
};

const initialFruits: Fruits[] = [
  {
    id: '1',
    name: 'Apple',
  },
  {
    id: '2',
    name: 'BlueBerry',
  },
  {
    id: '3',
    name: 'Orange',
  },
  {
    id: '4',
    name: 'Strawberry',
  },
  {
    id: '5',
    name: 'Grape',
  },
  {
    id: '6',
    name: 'Avocado',
  },
];

const measuringConfig: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const StyledDndkit = () => {
  const [fruits, setFruits] = useState(initialFruits);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeDrag = useMemo(() => {
    return activeId ? fruits.find((fruit) => fruit.id === activeId) : null;
  }, [activeId]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const dragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id.toString());
  };

  const dragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      setFruits((fruits) => {
        const oldIndex = fruits.findIndex((fruit) => fruit.id === active.id);
        const newIndex = fruits.findIndex((fruit) => fruit.id === over.id);
        return arrayMove(fruits, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const dragCancel = () => {
    setActiveId(null);
  };

  const next = (id: string) => {
    setFruits((fruits) => {
      const index = fruits.findIndex((fruit) => fruit.id === id);
      return arrayMove(fruits, index, index - 1);
    });
  };

  const prev = (id: string) => {
    setFruits((fruits) => {
      const index = fruits.findIndex((fruit) => fruit.id === id);
      return arrayMove(fruits, index, index + 1);
    });
  };

  const shuffle = () => {
    setFruits((fruits) => {
      const cloneFruits = fruits.slice();
      return cloneFruits.sort(() => Math.random() - 0.5);
    });
  };

  const shift = () => {
    setFruits((fruits) => {
      const cloneFruits = fruits.slice();
      const cloneFruit = cloneFruits.shift();
      cloneFruit && cloneFruits.push(cloneFruit);
      return cloneFruits;
    });
  };

  return (
    <>
      <div className='p-8'>
        <div className='flex gap-2'>
          <button
            onClick={shuffle}
            className='mb-4 flex items-center gap-2 rounded-md border bg-slate-100 py-2 px-4'
          >
            <IoSync />
            <p>Shuffle</p>
          </button>
          <button
            onClick={shift}
            className='mb-4 flex items-center gap-2 rounded-md border bg-slate-100 py-2 px-4'
          >
            <IoSwapVertical />
            <p>Shift</p>
          </button>
        </div>
        <DndContext
          sensors={sensors}
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          onDragCancel={dragCancel}
          measuring={measuringConfig}
        >
          <DragOverlay>
            {activeDrag && (
              <div className='flex items-center justify-between rounded-md border border-slate-200 bg-slate-100 p-4 shadow-md'>
                <p>{activeDrag.name}</p>
                <div className='rounded-md bg-slate-200 p-1'>
                  <IoEllipsisVertical />
                </div>
              </div>
            )}
          </DragOverlay>
          <SortableContext
            items={fruits}
            strategy={verticalListSortingStrategy}
          >
            <div className='flex w-96 flex-col gap-2'>
              {fruits.map((fruit) => (
                <Sortable
                  key={fruit.id}
                  handle={false}
                  className={activeId === fruit.id ? 'opacity-25' : ''}
                  sortableArgs={{
                    id: fruit.id,
                    attributes: {
                      tabIndex: -1,
                    },
                  }}
                >
                  <div className='flex items-center justify-between rounded-md border border-slate-200 bg-slate-100 p-4'>
                    <p>{fruit.name}</p>

                    <div className='flex items-center gap-2'>
                      <button
                        className='rounded-md bg-slate-200 p-1'
                        onClick={() => next(fruit.id)}
                      >
                        <IoChevronUp />
                      </button>
                      <button
                        className='rounded-md bg-slate-200 p-1'
                        onClick={() => prev(fruit.id)}
                      >
                        <IoChevronDown />
                      </button>
                      <SortableHandle
                        sortableArgs={{
                          id: fruit.id,
                          attributes: {
                            tabIndex: -1,
                          },
                        }}
                      >
                        <div className='rounded-md bg-slate-200 p-1'>
                          <IoEllipsisVertical />
                        </div>
                      </SortableHandle>
                    </div>
                  </div>
                </Sortable>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
};

export default StyledDndkit;
