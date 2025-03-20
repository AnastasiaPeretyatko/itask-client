import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCoursesForProfessor, getOneCourse } from '@/services/course.service';
import { BaseCourseT } from '@/types/course.type';
import { handleThunkError } from '@/utils/handleThunkError';

export const getCoursesForProfessorThunk = createAsyncThunk<
  BaseCourseT[],
  string,
  {
    rejectValue: { statusCode: number; message: string }
  }
>('/assignment/professor', async (id, { rejectWithValue }) => {
  try {
    const { data } = await getCoursesForProfessor(id);
    console.log({ data });
    return data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

const get = createAsyncThunk<BaseCourseT, string, { rejectValue: string }>('course.get', async (id, { rejectWithValue }) => {
  try {
    const { data } = await getOneCourse(id);
    return data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const course = { getCoursesForProfessorThunk, get };