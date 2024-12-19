import { getAllByProfessor } from '@/services/course.service'
import { MessageType } from '@/types/common.type'
import { BaseCourseT } from '@/types/course.type'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getAllByProfessorThunk = createAsyncThunk<
  BaseCourseT[],
  string,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/get-professor-course', async (id, { rejectWithValue }) => {
  try {
    const res = await getAllByProfessor(id)

    return res.data
  } catch (error) {
    const hasErrResponse = (
      error as {
        response: { data: { statusCode: number; message: MessageType } }
      }
    ).response
    if (!hasErrResponse) {
      throw error
    }
    return rejectWithValue(hasErrResponse.data)
  }
})
