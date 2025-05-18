import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTaskById } from '@/services/task.service';
import { addAnswerTask, updateUserTask } from '@/services/user-task.service';
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

export const addAnswerTaskThunk = createAsyncThunk<
{ message: string, data: any },
{ taskId: string, documentIds: string[], answer: string },
{ rejectValue: { statusCode: number; message: string }
  fulfilled: { message: string, data: any }}>
  ('task.answer', async (dto, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await addAnswerTask(dto);
      return fulfillWithValue(data);
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  });

export const getTaskByIdThunk = createAsyncThunk<
any,
string,
{ rejectValue: { statusCode: number; message: string }}>
('task.one', async (id, { rejectWithValue }) => {
  try {
    const { data } = await getTaskById(id);
    return data.data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});