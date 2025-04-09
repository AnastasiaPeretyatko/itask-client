import { createSlice } from '@reduxjs/toolkit';
import { UserT } from '@/types/user.type';

type TInitialState = {
  isOpenSidebar: boolean
  user: UserT | null
}

const initialState: TInitialState = {
  isOpenSidebar: true,
  user: null,
};

export const config = createSlice({
  name: 'user-setting',
  initialState,
  reducers: {
    toggleSidebar: (state, { payload }: { payload: boolean }) => {
      state.isOpenSidebar = payload;
      console.log(state.user);
      localStorage.setItem('sidebar', payload.toString());
    },
    setUser: (state, { payload }: { payload: UserT }) => {
      state.user = payload;
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    },
  },
});


export const settings = config.actions;

export default config.reducer;
