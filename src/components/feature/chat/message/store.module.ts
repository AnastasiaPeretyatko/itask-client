import { create } from 'zustand';
import { getMessages } from '@/services/message.service';
import { Message } from '@/types/message.type';

type MessageStore = {
  roomId: string | null;
  messages: Message[];
  fetchMessages: (roomId: string) => Promise<void>;
  setRoomId: (roomId: string) => void;
  setMessage: (message: Message) => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  roomId: null,
  messages: [],
  fetchMessages: async (roomId: string) => {
    try {
      const res = await getMessages({ id: roomId });
      set({ messages: res.data }); // обновляем синхронно
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Failed to fetch rooms:', error.message);
      throw error;
    }
  },
  setRoomId: (roomId: string) => set((state) => ({
    ...state,
    roomId,
  })),
  setMessage: (message: Message) => set((state) => ({
    ...state,
    messages: [...state.messages, message],
  })),
}));