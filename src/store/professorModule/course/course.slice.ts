import { createSlice } from '@reduxjs/toolkit';
import { course, getCoursesForProfessorThunk } from './course.thunk';
import { BaseCourseT } from '@/types/course.type';

type TInitialState = {
  courses: BaseCourseT[];
  course: BaseCourseT;
  isLoading: boolean;
}

const initialState: TInitialState = {
  course: {} as BaseCourseT,
  courses: [],
  isLoading: true,
};

export const courseStore = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoursesForProfessorThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.courses = payload;
      })
      .addCase(course.get.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(course.get.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.course = payload;
      })
      .addCase(course.get.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default courseStore.reducer;
