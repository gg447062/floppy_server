/* eslint-disable no-console */
const app = require('./server');
const dotenv = require('dotenv').config();
const socket = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('new connection:', socket.id);

  socket.on('disconnect', (reason) => {
    console.log('socket disconnected:', reason);
  });
  socket.emit('message', 'welcome');

  socket.on('SetRecordState', (msg, callback) => {
    console.log('Setting Recording State:', msg);
    // Check if 'msg' is true
    if (msg === true) {
      socket.emit('message', 'recording');
      callback('Server is recording!');
    } else {
      socket.emit('messsage', 'done recording');
      callback('Server is not recording!');
    }
  });
});
