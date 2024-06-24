import { Socket } from 'socket.io';
import { Server } from 'http';
const socket = require('socket.io');
import cors from 'cors';
import { isPartOfTypeNode } from 'typescript';

const connectSocketIo = (Server: Server) => {
  const io = socket(Server, {
    cors: {
      origin: ['http://localhost:5173'],
      method: ['GET', 'POST'],
      credentials: true,
    },
  });

  const userSocketMap: { [key: string]: string } = {};
  const userLastSeen: { [key: string]: number } = {}; // Store last seen timestamp

  const getRecieverSocketId = (recieverId: string): string | undefined => {
    return userSocketMap[recieverId];
  };

  io.on('connection', (socket: Socket) => {
    console.log('Socket Connected', socket.id);
    const userId: string = socket.handshake.query.userId as string;
    if (userId) {
      userSocketMap[userId] = socket.id;
      userLastSeen[userId] = Date.now(); 
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('newMessage', (newMessage) => {
      const recieverSocketId = getRecieverSocketId(newMessage.obj.reciever);
      if (recieverSocketId) {
        io.to(recieverSocketId).emit('newMessage', newMessage);
      } else {
        console.log('reciever is offline');
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket Disconnected', socket.id);
      Object.keys(userSocketMap).forEach((key) => {
        if (userSocketMap[key] === socket.id) {
          delete userSocketMap[key];
          userLastSeen[key] = Date.now(); 
        }
      });
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });

    socket.on('readMessage', (messageId, chatId) => {
    });

    socket.on('typing', ({ roomId, sender }) => {
        console.log('Typing event received on server', roomId, sender);
        io.to(roomId).emit('typing', { sender, roomId });
      });

    socket.on('stopTyping', ({ roomId, sender }) => {
        console.log('typing is stopped');
      io.to(roomId).emit('stopTyping', { sender });
    });
  });
};

export default connectSocketIo;
