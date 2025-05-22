import { createSlice } from '@reduxjs/toolkit';
import { createTaskThunk } from '../professorModule/course/course.thunk';
import { addAnswerTaskThunk, updateUserTaskThunk } from './task.thunk';

import { Property } from '@/types/course.type';
import { Solutions } from '@/types/task.type';
import presentNewTaskModal from '@/utils/presentNewTaskModal';
import presentTaskModal from '@/utils/presentTaskModal';

export type CreateTask = {
  id?: string;
  title: string;
  text: string;
  creatorId: string;
  property: Property;
  user_task: null | Solutions;
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
      if(user && user.professorId && Object.keys(payload).length === 0){
        state.task = presentNewTaskModal(user.professorId);
      }
      if(Object.keys(payload).length){
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
      if(state.task && state.task.user_task){
        state.task = { ...state.task, user_task: { ...state.task.user_task, answer: { ...state.task.user_task.answer, code: payload } } };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTaskThunk.fulfilled, (state) => {
        state.task = null;
      })
      .addCase(updateUserTaskThunk.fulfilled, (state, { payload }) => {
        if(state.task?.user_task){
          state.task = { ...state.task, user_task: { ...state.task?.user_task, ...payload } };
        }
      })
      .addCase(addAnswerTaskThunk.fulfilled, (state, { payload }) => { });
  },
});

export const { createTask, updateTask, clearTask, updateProperty, addAnswer } = taskSlice.actions;

export default taskSlice.reducer;
