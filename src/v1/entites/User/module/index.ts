import { create } from 'zustand';
import { UserType } from '../types';
import { loginRequest } from '@/services/auth.service';

type UserStore = {
  user: UserType | null;
  setUser: (email: string, password: string) => Promise<void>;
  updateUser: (user: UserType) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: async(email, password) => {
    try {
      const res = await loginRequest(email, password);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      set({ user: res.data.user });
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: (user: UserType) => {
    set({ user });
  },
}));