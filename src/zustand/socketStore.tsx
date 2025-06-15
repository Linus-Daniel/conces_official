import {create} from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  updates: any[];  // store received updates
  connect: () => void;
  disconnect: () => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  updates: [],

  connect: () => {
    const socket = io(undefined, { path: 'http://localhost:5000' });
    console.log('🔗 Connecting to socket.io server...');
    socket.on('connect', () => {
      console.log('⚡ Socket connected:', socket.id);
    });

    socket.on('post-change', (data) => {
      console.log('🟢 Received post-change:', data);
      set((state) => ({ updates: [...state.updates, data] }));
    });

    set({ socket });
  },

  disconnect: () => {
    set((state) => {
      state.socket?.disconnect();
      return { socket: null };
    });
  },
}));
