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
      return index === 0 ? fruits : arrayMove(fruits, index, index - 1);
    });
  };

  const prev = (id: string) => {
    setFruits((fruits) => {
      const index = fruits.findIndex((fruit) => fruit.id === id);
      return index === fruits.length -1 ? fruits : arrayMove(fruits, index, index + 1);
    });
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onDragCancel={dragCancel}
      measuring={measuringConfig}
    >
      <DragOverlay>
        {activeDrag && (
          <p>{activeDrag.name}</p>
        )}
      </DragOverlay>
        <SortableContext items={fruits} strategy={verticalListSortingStrategy}>
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
              <div className="flex justify-between items-center w-32">
                <p>{fruit.name}</p>

                <div className="flex items-center">
                  <button onClick={() => next(fruit.id)}>
                    <IoCaretUp />
                  </button>
                  <button onClick={() => prev(fruit.id)}>
                    <IoCaretDown />
                  </button>
                  <SortableHandle sortableArguments={{
                    id:fruit.id,
                    attributes:{
                      tabIndex:-1
                    }
                  }}>
                      <IoEllipsisVertical />
                  </SortableHandle>
                </div>
              </div>
            </Sortable>
          ))}
        </SortableContext>
    </DndContext>
  )
}

export default Dndkit;
