import { createSlice } from '@reduxjs/toolkit'
import { getAllByProfessorThunk } from './professor.course.thunk'
import { BaseCourseT } from '@/types/course.type'

type TInitialState = {
  data: BaseCourseT[]
  isLoading: boolean
}

const initialState: TInitialState = {
  data: [],
  isLoading: false,
}

export const professorCourse = createSlice({
  name: 'professor-courses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllByProfessorThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(getAllByProfessorThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = payload
      })
      .addCase(getAllByProfessorThunk.rejected, state => {
        state.isLoading = false
      })
  },
})

// export const { changeStateSidebar, setUser } = courses.actions

export default professorCourse.reducer
