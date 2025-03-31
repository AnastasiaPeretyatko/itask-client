import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { addOption, addProperty, addValue, fetchCourse, getCoursesForProfessorThunk } from './course.thunk';
import { TaskModel, TCourse } from '@/types/course.type';

type TInitialState = {
  courses: TCourse[];
  course: TCourse;
  isLoading: boolean;
}

const initialState: TInitialState = {
  course: {} as TCourse,
  courses: [],
  isLoading: true,
};

export const courseStore = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    createTask: {
      reducer: (state, { payload }: PayloadAction<TaskModel>) => {
        if(!state.course.tasks) {state.course.tasks = [];}
        state.course.tasks.push(payload);
      },
      prepare: () => {
        const task: TaskModel = {
          id: uuid(),
          title: '',
          description: '',
          values: {},
        };
        return { payload: task };
      },
    },
    changeTaskTitle: (state, { payload }: { payload: { taskId: string, title: string } }) => {
      const { taskId, title } = payload;
      state.course.tasks = state.course.tasks.map((task) => task.id === taskId ? { ...task, title } : task);
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
      .addCase(addProperty.fulfilled, (state, { payload }) => {
        if(!state.course.properties) {state.course.properties = [];}
        state.course.properties.push(payload);
      })
      .addCase(addValue.fulfilled, (state, { payload }) => {
        const { newValue, taskId } = payload;
        state.course.tasks = state.course.tasks.map((task) => task.id === taskId ? { ...task, values: { ...task.values, ...newValue } } : task);
      })
      .addCase(addOption.fulfilled, (state, { payload }) => {
        const { newOption, propertyId } = payload;
        state.course.properties = state.course.properties.map((p) => p.id === propertyId ? { ...p, options: [...(p.options || []), newOption ] } : p);
      });
  },
});

export const { createTask, changeTaskTitle } = courseStore.actions;

export default courseStore.reducer;
