import { createAsyncThunk } from '@reduxjs/toolkit';
import { createRoom, getAllRoom, getUserForRoom } from '@/services/chat.service';
import { createMessage, getMessages } from '@/services/message.service';
import { MessageType } from '@/types/common.type';
import { Message } from '@/types/message.type';
import { Room } from '@/types/room';
import { handleThunkError } from '@/utils/handleThunkError';

export const createRoomThunk = createAsyncThunk<
  {data: Room, message: string},
  { title?: string, userIds: string[] },
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfilled: { data: Room, message: string }
  }
>('/room.create', async (body, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await createRoom(body);
    return fulfillWithValue({ ...data });
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const getAllRoomThunk = createAsyncThunk<
  Room[],
  undefined,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/room.getall', async (_, { rejectWithValue }) => {
  try {
    const { data } = await getAllRoom();
    return data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const getUserForRoomsThunk = createAsyncThunk<
  {id: string, email: string}[],
  undefined,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/user.getall', async (_, { rejectWithValue }) => {
  try {
    const { data } = await getUserForRoom();
    return data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const createMessageThunk = createAsyncThunk<
  Message,
  { id?: string, content: string, task_id?: string, parent_id?: string },
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/message.create', async (body, { rejectWithValue }) => {
  try {
    const { data } = await createMessage(body);
    return data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const getMessageThunk = createAsyncThunk<
  Message[],
  { id?: string, task_id?: string },
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/message.all', async (body, { rejectWithValue }) => {
  try {
    const { data } = await getMessages(body);
    return data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});