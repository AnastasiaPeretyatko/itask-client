import { create } from 'zustand';
import { getAllRoom } from '@/services/chat.service';
import { Room, User } from '@/types/room';

type RoomStore = {
  rooms: Room[] | [];
  setRoom: (room: Room) => void;
  fetchRooms: () => Promise<void>;
  typingUsers: string[];
  setTypingUsers: (typingUsers: string[]) => void;
  removeTypingUser: (id: string) => void;
  getRoom: (id: string) => Room | undefined;
  getUser: (roomId: string, user_id: string) => User | undefined
};

export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: [],
  typingUsers: [],
  getUser: (roomId: string, user_id?: string) => {
    const room = get().getRoom(roomId);
    if (room?.is_private) {
      return room.users.find((user) => user.id !== user_id);
    }
  },
  setTypingUsers: (typingUsers: string[]) => set((state) => ({ typingUsers: [...state.typingUsers, ...typingUsers] })),
  removeTypingUser: (id: string) => set((state) => ({ typingUsers: state.typingUsers.filter((userId) => userId !== id) })),
  setRoom: (rooms) => set((state) => ({ rooms: [...state.rooms, rooms] })),
  fetchRooms: async () => {
    try {
      const res = await getAllRoom();
      set({ rooms: res.data }); // обновляем синхронно
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Failed to fetch rooms:', error.message);
      throw error; // или просто return
    }
  },
  getRoom: (id: string) => {
    const { rooms } = get();
    return rooms.find((room) => room.id === id);
  },
}));