import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { PropertyTypes } from '@/feature/property/PropertyRegistry';
import { getCoursesForProfessor, getOneCourse } from '@/services/course.service';
import { createTaskRequest, getAllTaskRequest } from '@/services/task.service';
import { transaction } from '@/services/transition.service';
import { PropertyModel, PropertyOptions, PropertyValues, TaskModel, TAssignment, TCourse } from '@/types/course.type';
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

export const addProperty = createAsyncThunk<PropertyModel, keyof typeof PropertyTypes, { rejectValue: string }>
('course.addProperty',async (type, { rejectWithValue }) => {
  try {
    const property: PropertyModel = {
      id: uuid(),
      type: PropertyTypes[type as unknown as keyof typeof PropertyTypes],
      title: type as unknown as string,
      o: 0,
      visible: true,
    };
    return property;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const addValue = createAsyncThunk<
  {taskId: string, newValue: TaskModel['values']},
  {taskId: string, propertyId: string, value: PropertyValues},
  {rejectValue: string}>
  ('course.addValue',async ({ taskId, propertyId, value }, { rejectWithValue }) => {
    try {
      const newValue: TaskModel['values'] = { [propertyId]: value };
      return { taskId, newValue };
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  });

export const addOption = createAsyncThunk<
  {propertyId: string, newOption: PropertyOptions},
  {propertyId: string, option: Omit<PropertyOptions, 'id'>},
  {rejectValue: string}>
  ('course.addOption', async ({ propertyId, option }, { rejectWithValue }) => {
    try {
      const newOption = {
        id: uuid(),
        label: option.label,
        color: option.color,
      };

      return { propertyId, newOption };
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
('task.create', async (courseId, { rejectWithValue }) => {
  try {
    const { data } = await getAllTaskRequest(courseId);
    return data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const changeProperty = createAsyncThunk<
unknown,
{path: string, data: any},
{ rejectValue: { statusCode: number; message: string }}>
('task.create', async (data, { rejectWithValue }) => {
  try {
    await transaction(data);
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const course = { getCoursesForProfessorThunk, fetchCourse, addProperty };