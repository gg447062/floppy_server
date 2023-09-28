/* eslint-disable no-console */
const app = require('./server');
const dotenv = require('dotenv').config();
const socket = require('socket.io');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
  const ip =
    req.headers['x-forwarded-for'] || req.socket.remoteAddress.split(':')[3];

  console.log('new connection:', ip);
  ws.on('error', console.error);
  ws.on('message', (data) => {
    const { room, message } = JSON.parse(data);
    console.log(`recieved ${message} for room ${room}`);
  });
  ws.send('welcome');
});

// const io = socket(server, {
//   cors: {
//     origin: '*',
//   },
// });

// io.on('connection', (socket) => {
//   const ip =
//     socket.handshake.headers['x-forwarded-for'] ||
//     socket.conn.remoteAddress.split(':')[3];
//   console.log('new connection:', socket.id, ip);

//   socket.on('disconnect', (reason) => {
//     console.log('socket disconnected:', reason);
//   });
//   socket.emit('message', 'welcome');

//   socket.on('SetRecordState', (msg, callback) => {
//     console.log('Setting Recording State:', msg);

//     if (msg) {
//       socket.emit('message', 'record');
//       callback('Server is recording!');
//     } else {
//       socket.emit('message', 'stop');
//       callback('Server is not recording!');
//     }
//   });
// });
