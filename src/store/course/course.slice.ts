import { createSlice } from '@reduxjs/toolkit';
import { getAllFromSemesterGroupThunk } from './course.thunk';
import { CourseT } from '@/types/course.type';

type TInitialState = {
  data: CourseT[]
  isLoading: boolean
}

const initialState: TInitialState = {
  data: [],
  isLoading: false,
};

export const courses = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFromSemesterGroupThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFromSemesterGroupThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(getAllFromSemesterGroupThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default courses.reducer;
