import { Grid } from '@chakra-ui/react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import ColumnBoard from './ColumnBoard';
import { AppDispatch, RootState } from '@/store';
import { updateTaskStatusThunk } from '@/store/studentModule/tasks/dashboard.thunk';

export type TaskStatus = 'NEW' | 'REOPENED' | 'RESOLVED' | 'CLOSED';

export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};

const COLUMNS: Column[] = [
  { id: 'NEW', title: 'Новые' },
  { id: 'REOPENED', title: 'Открытые повторно' },
  { id: 'RESOLVED', title: 'Решенные' },
  { id: 'CLOSED', title: 'Закрытые' },
];

const Board = () => {
  const { tasks } = useSelector((state: RootState) => state.dashboardTask);
  const dispatch = useDispatch<AppDispatch>();


  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {return;}

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    dispatch(updateTaskStatusThunk({ id: taskId, status: newStatus }));
  }

  return (
    <Grid
      templateColumns={'repeat(4, 1fr)'}
      width={'full'}
      height="full"
      gap={5}
    >
      <DndContext onDragEnd={handleDragEnd}>
        {
          COLUMNS.map((column) => (
            <ColumnBoard
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.user_task.status === column.id)}
            />
          ))
        }
      </DndContext>

    </Grid>
  );
};

export default Board;