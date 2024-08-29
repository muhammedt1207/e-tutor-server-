import { Socket } from 'socket.io';
import { Server } from 'http';
import { setLastSeen } from '../database/mongo/repositories/setLastSeen';
import { messageSeen } from '../database/mongo/repositories/messageSeen';

const socketIo = require('socket.io');

const connectSocketIo = (server: Server) => {
  const io = socketIo(server, {
    cors: {
      origin: ['https://e-tutor-umber.vercel.app'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  const userSocketMap: { [key: string]: string } = {};

  const getReceiverSocketId = (receiverId: string): string | undefined => {
    return userSocketMap[receiverId];
  };

  io.on('connection', (socket: Socket) => {
    console.log('Socket Connected', socket.id);
    const userId: string = socket.handshake.query.userId as string;
    if (userId) {
      userSocketMap[userId] = socket.id;
      setLastSeen(userId, Date.now());
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('newMessage', (newMessage: any) => {
      console.log('New Message:', newMessage);
      const receiverSocketId = getReceiverSocketId(newMessage.obj.reciever);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', newMessage);
        setLastSeen(newMessage.obj.sender, Date.now());
      } else {
        console.log('Receiver is offline');
      }
    });

    socket.on('messageSeen', async ({ messageId, chatId, recieverId }) => {
      console.log(`Message seen: ${messageId}, ${chatId}, ${recieverId}`);
      await messageSeen(messageId);
      const receiverSocketId = getReceiverSocketId(recieverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('messageSeen', { messageId, chatId });
      }
    });

    socket.on('typing', ({ receiverId, sender }) => {
      console.log(`Typing from ${sender} to ${receiverId}`);
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('typing', { sender });
      }
    });

    socket.on('stopTyping', ({ receiverId, sender }) => {
      console.log(`Stop typing from ${sender} to ${receiverId}`);
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('stopTyping', { sender });
      } else {
        console.log("Receiver not found to stop typing");
      }
    });

    socket.on("videoCall", (data) => {
      console.log("hello chat in Videochat",data)
      const targetSocketId:any =getReceiverSocketId(data.id)
      console.log(targetSocketId)
      io.to(targetSocketId).emit('incomingCall', { data });
  });

    socket.on('joinCall', ({ callId }) => {
      console.log(`Joining call with callId ${callId}`);
      socket.join(callId);
    });

    socket.on('offer', ({ offer, callId }) => {
      console.log(`Offer received for call ${callId}`);
      socket.to(callId).emit('offer', { offer });
    });

    socket.on('answer', ({ answer, callId }) => {
      console.log(`Answer received for call ${callId}`);
      socket.to(callId).emit('answer', { answer });
    });

    socket.on('ice-candidate', ({ candidate, callId }) => {
      console.log(`ICE candidate received for call ${callId}`);
      socket.to(callId).emit('ice-candidate', { candidate });
    });

    socket.on('endCall', ({ callId }) => {
      console.log(`Ending call with callId ${callId}`);
      io.to(callId).emit('callEnded');
      io.in(callId).socketsLeave(callId);
    });

    socket.on('acceptCall', ({ senderId, receiverId }) => {
      console.log(`Accepting call from ${senderId} by ${receiverId}`);
      const senderSocketId = getReceiverSocketId(senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit('callAccepted', { receiverId });
      } else {
        console.log("Sender not found to accept call");
      }
    });

    socket.on('declineCall', ({ senderId, receiverId }) => {
      console.log(`Declining call from ${senderId} by ${receiverId}`);
      const senderSocketId = getReceiverSocketId(senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit('callDeclined', { receiverId });
      } else {
        console.log("Sender not found to decline call");
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket Disconnected', socket.id);
      Object.keys(userSocketMap).forEach((key) => {
        if (userSocketMap[key] === socket.id) {
          delete userSocketMap[key];
          setLastSeen(key, Date.now());
        }
      });
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
  });
};

export default connectSocketIo;
