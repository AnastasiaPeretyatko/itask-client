import { createSlice } from '@reduxjs/toolkit';
import { createTaskThunk } from '../professorModule/course/course.thunk';
import { Property } from '@/types/course.type';
import presentNewTaskModal from '@/utils/presentNewTaskModal';
import presentTaskModal from '@/utils/presentTaskModal';

export type CreateTask = {
  id?: string;
  title: string;
  text: string;
  creatorId: string;
  property: Property;
  answer?: string | null;
}

type TInitialState = {
  task: CreateTask | null;
}

const initialState: TInitialState = {
  task: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state, { payload }) => {
      const userJSON = localStorage.getItem('user');
      const user = userJSON ? JSON.parse(userJSON) : null;
      if(user && user.professorId && !payload){
        state.task = presentNewTaskModal(user.professorId);
      }
      if(payload){
        console.log('create', payload);
        state.task = presentTaskModal(payload);
      }
    },
    updateTask: (state, { payload }) => {
      state.task = { ...state.task, ...payload };
    },
    updateProperty: (state, { payload }) => {
      if(state.task){
        state.task = { ...state.task, property: { ...state.task.property, ...payload } };
      }
    },
    clearTask: (state) => {
      state.task = null;
    },
    addAnswer: (state, { payload }) => {
      if(state.task){
        //TODO сделать объект хранить сам эдитор и код
        state.task = { ...state.task, answer: payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTaskThunk.fulfilled, (state) => {
        state.task = null;
      });
  },
});

export const { createTask, updateTask, clearTask, updateProperty, addAnswer } = taskSlice.actions;

export default taskSlice.reducer;
