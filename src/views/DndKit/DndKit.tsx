import type { DragEndEvent, DragStartEvent, MeasuringConfiguration} from "@dnd-kit/core";
import { MeasuringStrategy} from "@dnd-kit/core";
import { DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { IoCaretDown, IoCaretUp, IoEllipsisVertical } from 'react-icons/io5'
import Sortable from "~/components/Dndkit/Sortable";
import SortableHandle from "~/components/Dndkit/SortableHandle";

type Fruits = {
  id:string;
  name:string;
}

const initialFruits:Fruits[] = [
  {
    id:'1',
    name:"Apple"
  },
  {
    id:'2',
    name:"BlueBerry"
  },
  {
    id:'3',
    name:"Orange"
  },
  {
    id:'4',
    name: "Strawberry",
  },
  {
    id:'5',
    name: "Grape",
  },
  {
    id:'6',
    name: "Avocado",
  },

]

const measuringConfig: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const Dndkit = () => {
  const [fruits,setFruits] = useState(initialFruits);
  const [activeId,setActiveId] = useState<string | null>(null);

  const activeDrag = useMemo(() => {
    return activeId ? fruits.find((fruit) => fruit.id === activeId) : null;
  },[activeId])

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );

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

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        onDragCancel={dragCancel}
        measuring={measuringConfig}
      >
        <DragOverlay>
          {activeDrag && (
            <div className="flex justify-between items-center p-4 bg-slate-100 rounded-md border border-purple-400">
              <p>{activeDrag.name}</p>
              <div className="p-1 bg-slate-200 rounded-md">
                <IoEllipsisVertical />
              </div>
            </div>
          )}
        </DragOverlay>
          <SortableContext items={fruits} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2 p-8 w-96">
              {fruits.map((fruit) => (
                <Sortable
                  key={fruit.id}
                  handle={false}
                  className={activeId === fruit.id ? 'opacity-25' : ''}
                  sortableArguments={{
                    id:fruit.id,
                    attributes:{
                      tabIndex:-1
                    }
                  }}
                >
                  <div className="flex justify-between items-center p-4 bg-slate-100 rounded-md border border-slate-200">
                    <p>{fruit.name}</p>

                    <div className="flex gap-2 items-center">
                      <button
                        className="p-1 bg-slate-200 rounded-md"
                        onClick={() => next(fruit.id)}
                      >
                        <IoCaretUp />
                      </button>
                      <button
                        className="p-1 bg-slate-200 rounded-md"
                        onClick={() => prev(fruit.id)}
                      >
                        <IoCaretDown />
                      </button>
                      <SortableHandle sortableArguments={{
                        id:fruit.id,
                        attributes:{
                          tabIndex:-1
                        }
                      }}>
                        <div className="p-1 bg-slate-200 rounded-md">
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
    </>
  )
}

export default Dndkit;
