import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type DocumentStore = {
  title: string;
  changeTitle: (title: string) => void;
  context: string;
  changeContext: (context: string) => void;
  changeAllDoc: (context: string, title: string) => void;
};

export const useChangeDocStore = create<DocumentStore>()(
  persist((set) => ({
    title: '',
    changeTitle: (title: string) => set({ title }),
    context: '',
    changeContext: (context: string) => set({ context }),
    changeAllDoc: (context: string, title: string) => set({ context, title }),
  }),
  {
    name: 'change-doc',
    storage: createJSONStorage(() => localStorage),
  },
  ),
);