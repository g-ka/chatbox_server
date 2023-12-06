const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const req_sent = new Schema({
  username: String,
  date: String,
  time: String
});

const req_recieved = new Schema({
  username: String,
  date: String,
  time: String
});

const messages = new Schema({
  id: Number,
  message: String
})

const connections = new Schema({
  username: String,
  messages: [messages]
});

const User = new Schema({
  username: String,
  password: String,
  refresh_token: String,
  req_sent: [req_sent],
  req_recieved: [req_recieved],
  connections: [connections]
});

module.exports = model('user', User);