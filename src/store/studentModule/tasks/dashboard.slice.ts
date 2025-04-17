import { createSlice } from '@reduxjs/toolkit';
import { getStudentsAndTaskThunk, updateTaskStatusThunk } from './dashboard.thunk';
import { updateUserTaskThunk } from '@/store/task/task.thunk';
import { DashboardTask } from '@/types/task.type';

type TInitialState = {
  tasks: DashboardTask[]
}

const initialState: TInitialState = {
  tasks: [],
};

export const dashboardTask = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentsAndTaskThunk.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(updateTaskStatusThunk.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.map((task) => {
          if (task.id === payload.data.id) {
            return { ...task, user_task: { ...task.user_task, status: payload.data.user_task.status } };
          }
          return task;
        });
      })
      .addCase(updateUserTaskThunk.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.map((task) => {
          if (task.id === payload.taskId) {
            return { ...task, user_task: { ...task.user_task, ...payload.updateTask } };
          }
          return task;
        });
      });
  },
});

export default dashboardTask.reducer;
