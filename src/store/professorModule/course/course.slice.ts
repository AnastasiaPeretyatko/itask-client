import { createSlice } from '@reduxjs/toolkit';
import { createTaskThunk, fetchCourse, getAllStudentsTaskByCourseThunk, getAllTaskThunk, getCoursesForProfessorThunk } from './course.thunk';
import { TaskModel, TCourse } from '@/types/course.type';
import { StudentTask } from '@/types/student.type';

type TInitialState = {
  temTask: null | Omit<TaskModel, 'assignment'>;
  courses: TCourse[];
  course: TCourse | null;
  students: StudentTask[];
  isLoading: boolean;
}

const initialState: TInitialState = {
  temTask: null,
  course: null,
  courses: [],
  students: [],
  isLoading: true,
};

export const courseStore = createSlice({
  name: 'courses',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(getCoursesForProfessorThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.courses = payload;
      })
      .addCase(fetchCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCourse.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.course = { ...payload };
      })
      .addCase(fetchCourse.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllTaskThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if(state.course){
          state.course.tasks = payload;
        }
      })
      .addCase(createTaskThunk.fulfilled, (state, { payload }) => {
        if(state.course){
          state.course.tasks.push(payload.task);
        }
      })
      .addCase(getAllStudentsTaskByCourseThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.students = payload;
      });
  },
});

export default courseStore.reducer;
