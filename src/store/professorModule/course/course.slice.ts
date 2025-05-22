import { createSlice } from '@reduxjs/toolkit';
import { createTaskThunk, fetchCourse, getAllStudentsTaskByCourseThunk, getAllTaskThunk, getCoursesForProfessorThunk } from './course.thunk';
import { updateUserTask } from '@/services/user-task.service';
import { updateUserTaskThunk } from '@/store/task/task.thunk';
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
        state.courses = payload.data;
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
      })
      .addCase(updateUserTaskThunk.fulfilled, (state, { payload }) => {
        state.students = state.students.map((student) => {
          student.tasks = student.tasks.map((task) => {
            if(payload.data.id === task.solutions.id) {
              return { ...task, solutions: { ...task.solutions, ...payload.data } };
            }
            return task;
          });
          return student;
        });
      });
  },
});

export default courseStore.reducer;
