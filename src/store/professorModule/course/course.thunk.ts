import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCoursesForProfessor } from '@/services/course.service';
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