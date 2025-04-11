import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllFromSemesterGroup } from '@/services/course.service';
import { MessageType } from '@/types/common.type';
import { CourseT } from '@/types/course.type';

export const getAllFromSemesterGroupThunk = createAsyncThunk<
  CourseT[],
  { semesterId: string; groupId: string },
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/course.create', async ({ semesterId, groupId }, { rejectWithValue }) => {
  try {
    const res = await getAllFromSemesterGroup(semesterId, groupId);

    return res.data;
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
