import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  const { user, isLoggedIn } = useSelector((state) => state.auth);


  useEffect(() => {
    let socketInstance = null;  

    if (isLoggedIn && user) {
      socketInstance = io(import.meta.env.VITE_SOCKET_URL, {
        auth: { userId: user._id },
        transports: ['websocket'],
        withCredentials: true
      });

      socketInstance.on('connect', () => {
        console.log('Socket connected');
        setConnected(true);
        socketInstance.emit('update_status', true);
      });

      socketInstance.on('disconnect', () => {
        console.log('Socket disconnected');
        setConnected(false);
      });

      socketInstance.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setConnected(false);
      });

      setSocket(socketInstance);
    }

    return () => {
      if (socketInstance) {
        socketInstance.emit('update_status', false);
        socketInstance.disconnect();
      }
    };
  }, [isLoggedIn, user]);

  const joinRoom = (roomId) => {
    if (socket && roomId) {
      socket.emit('join_room', roomId);
    }
  };

  const leaveRoom = (roomId) => {
    if (socket && roomId) {
      socket.emit('leave_room', roomId);
    }
  };

  const sendTyping = (roomId, isTyping) => {
    if (socket && roomId) {
      socket.emit(isTyping ? 'typing' : 'stop_typing', { roomId });
    }
  };

  return (
    <SocketContext.Provider value={{ socket, connected, joinRoom, leaveRoom, sendTyping }}>
      {children}
    </SocketContext.Provider>
  );
};


export const useSocket = () => useContext(SocketContext);
