import type { DragEndEvent, DragStartEvent, MeasuringConfiguration, SensorOptions} from "@dnd-kit/core";
import { MeasuringStrategy} from "@dnd-kit/core";
import { DragOverlay} from "@dnd-kit/core";
import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState, useEffect, useMemo } from "react";
import useTasks from "../hooks/useTasks";
import TaskContent from "./TaskContent";
import Sortable from "~/components/Dndkit/Sortable";

const pointerSensorOptions: SensorOptions = {
  activationConstraint: {
    delay: 150,
    tolerance: 5,
  },
};

const measuringConfig: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const TasksList = () => {
  const { tasks,move,findById } = useTasks();
  const[lording,setLording] = useState(true);
  useEffect(() => {setLording(false)},[]);

  const [activeId,setActiveId] = useState<string | null>(null);
  const activeTask = useMemo(() => activeId ? findById(activeId) : null,[activeId]);

  const sensors = useSensors(
    useSensor(MouseSensor,pointerSensorOptions),
    useSensor(TouchSensor,pointerSensorOptions),
  );

  const dragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      move(active.id.toString(),over.id.toString())
    }
    setActiveId(null);
  };
  const dragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id.toString());
  };

  return (
    <ul className="flex flex-col gap-4">
      {!lording && (
        <DndContext
          sensors={sensors}
          measuring={measuringConfig}
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <DragOverlay>
            {activeTask && (
              <div className="shadow-xl cursor-grabbing">
                <TaskContent task={activeTask} />
              </div>
            )}
          </DragOverlay>
          <SortableContext
            items={tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <Sortable
                key={task.id}
                className={activeId === task.id ? 'opacity-30' : ''}
                sortableArguments={{
                  id: task.id,
                  attributes: {
                    tabIndex: -1,
                  }
                }}
              >
                <li key={task.id}>
                  <TaskContent task={task} />
                </li>
              </Sortable>
            ))}
          </SortableContext>
        </DndContext>
      )}
    </ul>
  )
}

export default TasksList;
