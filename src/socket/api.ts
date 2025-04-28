/* eslint-disable @typescript-eslint/no-explicit-any */
// socket/api.ts
import { io, Socket } from 'socket.io-client';

class SocketApi {
  static socket: null | Socket = null;

  static createConnection(userId: string) {
    if (this.socket) return;

    console.log({ userId });

    this.socket = io('http://localhost:8000', {
      query: { userId }, // Передаем ID пользователя при подключении
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  static subscribeToRoomCreated(callback: (data: {
    roomId: string;
    title: string;
    ownerId: string;
  }) => void) {
    this.socket?.on('room_created', callback);
  }

  static newMessage(callback: (data: {
      id: string,
      thread_id: string | null,
      is_deleted: boolean,
      is_edited: boolean,
      is_important: boolean,
      parent_id: string |null,
      author_id: string,
      room_id: string,
      content: string,
      updatedAt: Date,
      createdAt: Date
  } ) =>void) {
    this.socket?.on('new-message', callback);
  }

  static unsubscribeFromNewMessage() {
    this.socket?.off('new-message');
  }

  static unsubscribeFromRoomCreated() {
    this.socket?.off('room_created');
  }

  static on(event: string, callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }

  static emit(event: string, data: any) {
    this.socket?.emit(event, data);
  }

  static disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export default SocketApi;
