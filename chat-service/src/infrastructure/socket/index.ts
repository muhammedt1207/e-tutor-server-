import { Socket } from 'socket.io';
import { Server } from 'http';
import { setLastSeen } from '../database/mongo/repositories/setLastSeen';
import { saveNotification } from '../database/mongo/repositories/createNotification';
const socket = require('socket.io');

const connectSocketIo = (server: Server) => {
  const io = socket(server, {
    cors: {
      origin: ['http://localhost:5173'],
      method: ['GET', 'POST'],
      credentials: true,
    },
  });

  const userSocketMap: { [key: string]: string } = {};
  const userLastSeen: { [key: string]: number } = {}; 

  const getReceiverSocketId = (receiverId: string): string | undefined => {
    return userSocketMap[receiverId];
  };

  io.on('connection', (socket: Socket) => {
    console.log('Socket Connected', socket.id);
    const userId: string = socket.handshake.query.userId as string;
    if (userId) {
      userSocketMap[userId] = socket.id;
      userLastSeen[userId] = Date.now(); 
      setLastSeen(userId, Date.now());
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('newMessage', (newMessage: any) => {
      const receiverSocketId = getReceiverSocketId(newMessage.obj.reciever);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', newMessage);
        userLastSeen[newMessage.obj.sender] = Date.now(); 
        setLastSeen(newMessage.obj.sender, Date.now());
      } else {
        console.log('Receiver is offline');
      }
    });

    socket.on('typing', ({receiverId, sender}) => {
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('typing', { sender });
      }
    });
    
    socket.on('stopTyping', ({ receiverId, sender }) => {
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('stopTyping', { sender });
      }
    });

    socket.on('offer', (data) => {
      
      const receiverSocketId = getReceiverSocketId(data.receiverId);
      console.log('Offer received on server:', JSON.stringify(data));
      
      if (receiverSocketId) {
        console.log('Emitting incomingCall to:', receiverSocketId);
        io.to(receiverSocketId).emit('incomingCall', { 
          from: data.senderId, 
          senderId: data.senderId
        });
        console.log('Emitting offer to:', receiverSocketId);
        io.to(receiverSocketId).emit('offer', data);
      } else {
        console.log('Receiver not found:', data.receiverId);
      }
    });

    socket.on('answer', (data) => {
      console.log('Answer received on server:', JSON.stringify(data.receiverId));
      const receiverSocketId = getReceiverSocketId(data.receiverId);
      if (receiverSocketId) {
        console.log('Emitting answer to:', receiverSocketId);
        io.to(receiverSocketId).emit('answer', data);
      } else {
        console.log('Receiver not found:', data.receiverId);
      }
    });

    socket.on('ice-candidate', (data) => {
      console.log('ICE candidate received:', JSON.stringify(data));
      const receiverSocketId = getReceiverSocketId(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('ice-candidate', data);
      }
    });

    socket.on('callAccepted', (data) => {
      console.log('Call accepted:', JSON.stringify(data));
      const receiverSocketId = getReceiverSocketId(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('callAccepted', data);
      }
    });

    socket.on('callDeclined', (data) => {
      console.log('Call declined:', JSON.stringify(data));
      const receiverSocketId = getReceiverSocketId(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('callDeclined', data);
      }
    });

    socket.on('endCall', (data) => {
      console.log('Call ended:', JSON.stringify(data));
      const receiverSocketId = getReceiverSocketId(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('callEnded');
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket Disconnected', socket.id);
      Object.keys(userSocketMap).forEach((key) => {
        if (userSocketMap[key] === socket.id) {
          delete userSocketMap[key];
          userLastSeen[key] = Date.now(); 
          setLastSeen(key, Date.now());
        }
      });
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
  });
};

export default connectSocketIo;