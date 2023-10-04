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

// const clients = {};
// const rooms = {}

wss.on('connection', (ws, req) => {
  const ip =
    req.headers['x-forwarded-for'] || req.socket.remoteAddress.split(':')[3];
  // const id = crypto.randomUUID();

  // clients[id] = { id, ip };

  console.log('new connection at: ', ip);
  // console.log(clients);

  ws.on('close', () => {
    console.log('connection closed: ', ip);
    // delete clients[id];
    // console.log(clients);
  });

  ws.on('error', console.error);
  ws.on('message', (data) => {
    const [name, val] = data.toString().split('::');
    console.log(name, val);
  });
  ws.send('welcome');
});
