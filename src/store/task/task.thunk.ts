import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserTask } from '@/services/user-task.service';
import { UserTask } from '@/types/task.type';
import { handleThunkError } from '@/utils/handleThunkError';

export const updateUserTaskThunk = createAsyncThunk<
{message: string, taskId: string, updateTask: Partial<UserTask>},
{id: string, task: Partial<UserTask>},
{rejectValue: { statusCode: number; message: string }, fulfilled: { message: string } }>
('user_task.update', async ({ id, task }, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await updateUserTask(id, task);
    return fulfillWithValue({
      taskId: id,
      updateTask: { ...task },
      message: data.message,
    });
  }catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});