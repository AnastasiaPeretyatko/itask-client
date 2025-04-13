import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
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
  reducers: {
    createTask: (state) => {
      const user = localStorage.getItem('user');
      if(user && 'professorId' in JSON.parse(user) && JSON.parse(user).professorId){
        const task: Omit<TaskModel, 'assignment'> = {
          id: uuid(),
          title: '',
          text: '',
          creatorId: JSON.parse(user).professorId,
          endDate: null,
          startDate: null,
          priority: null,
          tags: null,
          score: null,
        };
        state.temTask = task;

      }
    },
    changeTaskTitle: (state, action: PayloadAction<string>) => {
      if(state.temTask){
        state.temTask = { ...state.temTask, title: action.payload };
      }
    },
    changeDescription: (state, action: PayloadAction<string>) => {
      if(state.temTask){
        state.temTask = { ...state.temTask, text: action.payload };
      }
    },
  },
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
      }).addCase(getAllStudentsTaskByCourseThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.students = payload;
      });
  },
});

export const { createTask, changeTaskTitle, changeDescription } = courseStore.actions;

export default courseStore.reducer;
