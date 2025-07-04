import { createSlice } from '@reduxjs/toolkit';
import { createMessageThunk, createRoomThunk, getAllRoomThunk, getMessageThunk, getUserForRoomsThunk } from './chat.thunk';
import { Message } from '@/types/message.type';
import { Room } from '@/types/room';

type TInitialState = {
  rooms: Room[]
  users: {id: string, email: string}[]
  messages: Message[]
  typingUser: string | null
}

const initialState: TInitialState = {
  rooms: [],
  users: [],
  messages: [],
  typingUser: null,
};

export const rooms = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      if(payload.room_id !== state.messages[0].room_id) return;
      state.messages.push(payload);
      state.rooms = state.rooms.map((room) => {
        if(room.id === payload.room_id) {
          return { ...room, messages: [payload] };
        }
        return room;
      });
    },
    setTypingUser: (state, { payload }) => {
      state.typingUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoomThunk.fulfilled, (state, { payload }) => {
        state.rooms.push(payload.data);
      })
      .addCase(getAllRoomThunk.fulfilled, (state, { payload }) => {
        state.rooms = payload;
      })
      .addCase(getUserForRoomsThunk.fulfilled, (state, { payload }) => {
        state.users = payload;
      })
      .addCase(createMessageThunk.fulfilled, (state, { payload }) => {
        if(payload.parent_id){
          state.messages = state.messages.map((message) => {
            if(message.id === payload.parent_id) {
              return { ...message, children: [...message.children, payload] };
            }
            return message;
          });
          return;
        }
        state.messages.push(payload);
        if(state.rooms.length){
          state.rooms = state.rooms.map((room) => {
            if(room.id === payload.room_id) {
              return { ...room, messages: [payload] };
            }
            return room;
          });
        }
      })
      .addCase(getMessageThunk.fulfilled, (state, { payload }) => {
        state.messages = payload;
      });
  },
});

export const { addMessage, setTypingUser } = rooms.actions;

export default rooms.reducer;
