/* eslint-disable @typescript-eslint/no-explicit-any */
// socket/api.ts
import { io, Socket } from 'socket.io-client';
import { Message } from '@/types/message.type';

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

class SocketApi {
  static socket: null | Socket = null;
  static currentRoomId: null | string = null;

  static createConnection(userId: string) {
    if (this.socket) return;

    this.socket = io(baseURL, {
      query: { userId }, // Передаем ID пользователя при подключении
    });

    this.socket.on('connection_success', () => {
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

  static createMessage(message: {
    id: string;
    content: string;
  }) {
    this.socket?.emit('chatMessage', { message });
  }

  static connectedRoom (username: string, roomId: string) {
    this.socket?.emit('joinRoom', { username, roomId });
  }

  static newMessage(callback: (data: {message: Message} ) =>void) {
    this.socket?.on('message', callback);
  }

  static isOnlineUser(callback: (data: string[]) => void) {
    this.socket?.on('status', callback);
  }

  static isOfflineUser(callback: (data: string[]) => void) {
    this.socket?.off('status', callback);
  }

  static unsubscribeFromNewMessage() {
    this.socket?.off('message');
  }

  static unsubscribeFromRoomCreated() {
    this.socket?.off('room_created');
  }

  static onTyping(data: { roomId: string; typing: boolean }) {
    this.socket?.emit('typing', data);
  }

  static typingUsers(callback: (data: { roomId: string; typing: boolean, userId: string[] }) => void) {
    this.socket?.on('typing', callback);
  }

  static onUserTyping(callback: (data: { roomId: string; userId: string[] }) => void) {
    this.socket?.on('userTyping', callback);
  }

  static offUserTyping(callback:(data: { roomId: string; userId: string[] }) => void) {
    this.socket?.off('stopTyping', callback);
  }

  static on(event: string, callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }

  static off(event: string) {
    this.socket?.off(event);
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
