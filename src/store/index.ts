import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/user.slice'
import coursesReducer from './course/course.slice'
import professorCourseReducer from './professor.course/professor.course.slice'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    professorCourse: professorCourseReducer,
  },
})
