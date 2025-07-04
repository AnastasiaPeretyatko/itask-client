import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllFromSemesterGroup } from '@/services/course.service';
import { MessageType } from '@/types/common.type';
import { TCourse } from '@/types/course.type';

export const getAllFromSemesterGroupThunk = createAsyncThunk<
TCourse[],
  { [key: string]: string },
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/course.create', async (params, { rejectWithValue }) => {
  try {
    const { data } = await getAllFromSemesterGroup(params);
    return data.data;
  } catch (error) {
    const hasErrResponse = (
      error as {
        response: { data: { statusCode: number; message: MessageType } }
      }
    ).response;
    if (!hasErrResponse) {
      throw error;
    }
    return rejectWithValue(hasErrResponse.data);
  }
});
