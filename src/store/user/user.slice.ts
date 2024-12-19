import { UserT } from '@/types/user.type'
import { createSlice } from '@reduxjs/toolkit'

type TInitialState = {
  isOpenSidebar: boolean | null
  user: UserT | null
}

const initialState: TInitialState = {
  isOpenSidebar: null,
  user: null,
}

export const settings = createSlice({
  name: 'user-setting',
  initialState,
  reducers: {
    changeStateSidebar: (state, { payload }: { payload: boolean }) => {
      state.isOpenSidebar = payload
      localStorage.setItem('sidebar', String(payload))
    },
    setUser: (state, { payload }: { payload: UserT }) => {
      state.user = payload
    },
  },
})

export const { changeStateSidebar, setUser } = settings.actions

export default settings.reducer
