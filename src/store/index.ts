import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './course/course.slice';
import professorCourseReducer from './professor.course/professor.course.slice';
import courseModule from './professorModule/course/course.slice';
import taskModule from './task/task.slice';
import userReducer from './user/user.slice';

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    professorCourse: professorCourseReducer,
    taskModule,
    courseModule,
  },
});
