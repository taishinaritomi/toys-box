'use client';

import type {
  DragEndEvent,
  DragStartEvent,
  MeasuringConfiguration,
  MouseSensorOptions,
  PointerSensorOptions,
} from '@dnd-kit/core';
import { MeasuringStrategy } from '@dnd-kit/core';
import { DragOverlay } from '@dnd-kit/core';
import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState, useEffect, useMemo } from 'react';
import { useTasksMutators, useTaskState } from '../states/tasksState';
import { TaskContent } from './TaskContent';
import { Sortable } from '@/components/Dndkit/Sortable';

const pointerSensorOptions: PointerSensorOptions & MouseSensorOptions = {
  activationConstraint: {
    delay: 250,
    tolerance: 5,
  },
};

const measuringConfig: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export const TasksList = () => {
  const { moveTask } = useTasksMutators();
  const { tasks, findById } = useTaskState();

  const [lording, setLording] = useState(true);
  useEffect(() => {
    setLording(false);
  }, []);

  const [activeId, setActiveId] = useState<string | null>(null);
  const activeTask = useMemo(
    () => (activeId ? findById(activeId) : null),
    [activeId],
  );

  const sensors = useSensors(
    useSensor(MouseSensor, pointerSensorOptions),
    useSensor(TouchSensor, pointerSensorOptions),
  );

  const dragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      moveTask(active.id.toString(), over.id.toString());
    }
    setActiveId(null);
  };
  const dragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id.toString());
  };

  return (
    <div className='mb-8 flex flex-col gap-4'>
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
              <div className='cursor-grabbing'>
                <TaskContent
                  task={activeTask}
                  dragId={activeTask.id}
                  overlay={true}
                />
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
                options={{
                  id: task.id,
                  attributes: {
                    tabIndex: -1,
                  },
                }}
              >
                <TaskContent task={task} dragId={activeId} overlay={false} />
              </Sortable>
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
