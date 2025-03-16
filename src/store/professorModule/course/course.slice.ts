import { createSlice } from '@reduxjs/toolkit';
import { getCoursesForProfessorThunk } from './course.thunk';
import { BaseCourseT } from '@/types/course.type';

type TInitialState = {
  courses: BaseCourseT[];
  isLoading: boolean;
}

const initialState: TInitialState = {
  courses: [],
  isLoading: true,
};

export const courses = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoursesForProfessorThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.courses = payload;
      });
  },
});

export default courses.reducer;
