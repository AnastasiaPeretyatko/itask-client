import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllByProfessor } from '@/services/course.service';
import { MessageType } from '@/types/common.type';
import { BaseCourseT } from '@/types/course.type';
import { handleThunkError } from '@/utils/handleThunkError';

export const getAllByProfessorThunk = createAsyncThunk<
  BaseCourseT[],
  string,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/get-professor-course', async (id, { rejectWithValue }) => {
  try {
    const res = await getAllByProfessor(id);

    return res.data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

