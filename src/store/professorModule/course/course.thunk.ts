import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCoursesForProfessor, getOneCourse } from '@/services/course.service';
import { createTaskRequest, getAllTaskRequest } from '@/services/task.service';
import { TaskModel, TAssignment, TCourse } from '@/types/course.type';
import { handleThunkError } from '@/utils/handleThunkError';

export const getCoursesForProfessorThunk = createAsyncThunk<TCourse[], string,
  {
    rejectValue: { statusCode: number; message: string }
  }
>('/assignment/professor', async (id, { rejectWithValue }) => {
  try {
    const { data } = await getCoursesForProfessor(id);
    return data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const fetchCourse = createAsyncThunk<
TCourse,
string,
{ rejectValue: string }
>('course.get', async (id, { rejectWithValue }) => {
  try {
    const { data } = await getOneCourse(id);
    return data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const createTaskThunk = createAsyncThunk<
{task: TaskModel, message: string},
{data: {task: TaskModel, assignment: TAssignment}},
{
  rejectValue: { statusCode: number; message: string }
  fulfilled: { task: TaskModel, message: string }
}>
('task.create', async ({ data: { task, assignment } }, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data: { data, message } } = await createTaskRequest({ task, assignment });
    return fulfillWithValue({
      task: data,
      message,
    });
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const getAllTaskThunk = createAsyncThunk<
TaskModel[],
string,
{ rejectValue: { statusCode: number; message: string }}>
('all_tasks', async (courseId, { rejectWithValue }) => {
  try {
    const { data } = await getAllTaskRequest(courseId);
    return data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const course = { getCoursesForProfessorThunk, fetchCourse };