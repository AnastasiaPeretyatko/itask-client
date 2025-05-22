import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCoursesForProfessor, getOneCourse, getStudentsTaskByCourse } from '@/services/course.service';
import { createTaskRequest, getAllTaskRequest } from '@/services/task.service';
import { TaskModel, TAssignment, TCourse } from '@/types/course.type';
import { StudentTask } from '@/types/student.type';
import { handleThunkError } from '@/utils/handleThunkError';

export const getCoursesForProfessorThunk = createAsyncThunk<{data: TCourse[], count: number}, undefined,
  {
    rejectValue: { statusCode: number; message: string }
  }
>('/assignment/professor', async (_, { rejectWithValue }) => {
  try {
    const { data } = await getCoursesForProfessor();
    return {
      data: data.data,
      count: data.count,
    };
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
{task: Partial<TaskModel>, assignment: TAssignment},
{
  rejectValue: { statusCode: number; message: string }
  fulfilled: { task: TaskModel, message: string }
}>
('task.create', async ({ task, assignment }, { rejectWithValue, fulfillWithValue }) => {
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
('all_tasks_course', async (courseId, { rejectWithValue }) => {
  try {
    const { data } = await getAllTaskRequest(courseId);
    return data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const getAllStudentsTaskByCourseThunk = createAsyncThunk<
StudentTask[],
{id: string, params: { semesterId: string, groupId: string }},
{ rejectValue: { statusCode: number; message: string }}>
('all_student_tasks', async ({ id, params }, { rejectWithValue }) => {
  try {
    const { data } = await getStudentsTaskByCourse(id, params);
    return data;
  }catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const course = { getCoursesForProfessorThunk, fetchCourse };