
const socketIo = require('socket.io');
const Message = require('../models/Message');

const setupSocket = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('auth', (token) => {
      jwt.verify(token, 'secret_key', (err, user) => {
        if (err) {
          socket.emit('unauthorized');
          return;
        }
        socket.user = user;
        socket.emit('authorized');
      });
    });

    socket.on('message', async (msg) => {
      if (socket.user) {
        const message = new Message(msg);
        await message.save();
        io.emit('message', msg);
      } else {
        socket.emit('unauthorized');
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = setupSocket;
