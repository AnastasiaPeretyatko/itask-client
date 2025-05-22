import { createSlice } from '@reduxjs/toolkit';
import { addAnswerTaskThunk, getAnswerTaskThunk, getTaskByIdThunk } from './task.thunk';
import { Solutions } from '@/types/task.type';

type TInitialState = {
  task: any
  userTask: Solutions | null
}

const initialState: TInitialState = {
  task: null,
  userTask: null,
};

export const newTask = createSlice({
  name: 'task-new',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskByIdThunk.fulfilled, (state, { payload }) => {
        state.task = payload;
      })
      .addCase(addAnswerTaskThunk.fulfilled, (state, { payload }) => {
        state.userTask = payload.data;
      })
      .addCase(getAnswerTaskThunk.fulfilled, (state, { payload }) => {
        state.userTask = payload;
      });
  },
});


export default newTask.reducer;
