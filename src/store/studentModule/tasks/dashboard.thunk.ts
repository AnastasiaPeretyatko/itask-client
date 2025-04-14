import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTaskByStudent, updateTaskStatus } from '@/services/task.service';
import { DashboardTask } from '@/types/task.type';
import { handleThunkError } from '@/utils/handleThunkError';

export const getStudentsAndTaskThunk = createAsyncThunk<
DashboardTask[],
{id: string, params?: { [key: string]: string }},
{ rejectValue: { statusCode: number; message: string }}>
('all_tasks', async ({ id, params }, { rejectWithValue }) => {
  try {
    const { data } = await getTaskByStudent(id, params);
    return data;
  }catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const updateTaskStatusThunk = createAsyncThunk<
{data: DashboardTask, message: string},
{id: string, status: string},
{ rejectValue: { statusCode: number; message: string }
}>
('patch_task_status', async ({ id, status }, { rejectWithValue }) => {
  try {
    const { data } = await updateTaskStatus(id, status);
    return data;
  }catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});