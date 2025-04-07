import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { addOption, addProperty, addValue, fetchCourse, getAllTaskThunk, getCoursesForProfessorThunk } from './course.thunk';
import { PropertyModel, TaskModel, TCourse } from '@/types/course.type';

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
        values: {},
        creatorId: '783cedb0-4146-4db2-8930-4f4a5e481f47', //TODO добавить пом айди пользователя
      };
      state.temTask = task;
    },
    changeTaskTitle: (state, action: PayloadAction<string>) => {
      if(state.temTask && state.temTask.title){
        state.temTask = { ...state.temTask, title: action.payload };
      }
    },
    setTitleProperty: (state, { payload }: {payload : {property: PropertyModel}}) => {
      const { property } = payload;
      if(state.course){
        state.course.properties = state.course.properties.map((p) => p.id === property.id ? property : p);
      }
    },
    removeProperty: (state, action: PayloadAction<string>) => {
      const propertyId = action.payload;
      if (state.course?.properties) {
        state.course.properties = state.course.properties.filter(
          (p) => p.id !== propertyId,
        );
      }
      if (state.temTask?.values) {
        delete state.temTask.values[propertyId];
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
      .addCase(addProperty.fulfilled, (state, { payload }) => {
        if(state.course){
          if(!state.course?.properties) {state.course.properties = [];}
          state.course?.properties.push(payload);
        }
      })
      .addCase(addValue.fulfilled, (state, { payload }) => {
        const { newValue } = payload;
        if(!state.temTask){return;}
        state.temTask = { ...state.temTask, values: { ...state.temTask.values, ...newValue } };
      })
      .addCase(addOption.fulfilled, (state, { payload }) => {
        const { newOption, propertyId } = payload;
        if(state.course && state.course?.properties){
          state.course.properties = state.course?.properties.map((p) => p.id === propertyId ? { ...p, options: [...(p.options || []), newOption ] } : p);
        }
      })
      .addCase(getAllTaskThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if(state.course){
          state.course.tasks = payload;
        }
      });
  },
});

export const { createTask, changeTaskTitle, setTitleProperty, removeProperty, chengeDescription } = courseStore.actions;

export default courseStore.reducer;
