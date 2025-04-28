import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './chat/chat.slice';
import coursesReducer from './course/course.slice';
import professorCourseReducer from './professor.course/professor.course.slice';
import courseReducer from './professorModule/course/course.slice';
import dashboardTaskReducer from './studentModule/tasks/dashboard.slice';
import taskReducer from './task/task.slice';
import userReducer from './user/user.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    professorCourse: professorCourseReducer,
    courseStore: courseReducer,
    dashboardTask: dashboardTaskReducer,
    task: taskReducer,
    rooms: roomsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем, если используем сложные объекты
    }),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
