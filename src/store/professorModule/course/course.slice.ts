import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { fetchCourse, getAllTaskThunk, getCoursesForProfessorThunk } from './course.thunk';
import { TaskModel, TCourse } from '@/types/course.type';

type TInitialState = {
  temTask: null | TaskModel;
  courses: TCourse[];
  course: TCourse | null;
  isLoading: boolean;
}

const initialState: TInitialState = {
  temTask: null,
  course: null,
  courses: [],
  isLoading: true,
};

export const courseStore = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    createTask: (state) => {
      const task: TaskModel = {
        id: uuid(),
        title: '',
        description: '',
        creatorId: '783cedb0-4146-4db2-8930-4f4a5e481f47', //TODO добавить пом айди пользователя
        endDate: null,
        startDate: null,
        priority: null,
        tags: null,
        score: null,
      };
      state.temTask = task;
    },
    changeTaskTitle: (state, action: PayloadAction<string>) => {
      if(state.temTask){
        console.log({ action });
        state.temTask = { ...state.temTask, title: action.payload };
      }
    },
    chengeDescription: (state, action: PayloadAction<string>) => {
      if(state.temTask){
        state.temTask = { ...state.temTask, description: action.payload };
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
      });
  },
});

export const { createTask, changeTaskTitle, chengeDescription } = courseStore.actions;

export default courseStore.reducer;
