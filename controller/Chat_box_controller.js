const users = require('../model/Users');

const chat_box_handler = async (req, res) =>
{
  const { username } = req.body;
  if(!username) return res.sendStatus(401);

  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(402);

  const auth_exist = await users.findOne({ refresh_token: refresh_token });
  if(!auth_exist) return res.sendStatus(403);

  const other_exist = await users.findOne({ username });
  if(!other_exist) return res.sendStatus(405);

  const auth_messages = auth_exist.connections.find(user => user.username === other_exist.username).messages;
  const other_messages = other_exist.connections.find(user => user.username === auth_exist.username).messages;
  
  const updated_auth_messages = auth_messages.map(chat => {
    return({
      id: chat.id,
      message: chat.message,
      _id: chat._id,
      auth: true
    })
  });

  const updated_other_messages = other_messages.map(chat => {
    return({
      id: chat.id,
      message: chat.message,
      _id: chat._id,
      auth: false
    })
  });

  const total_messages = updated_auth_messages.concat(updated_other_messages);
  const sorted_messages = total_messages.sort((a, b) => a.id - b.id);

  return res.status(200).json({ sorted_messages });
};

const save_message_handler = async (req, res) =>
{
  const { other_username, message } = req.body;
  if(!other_username || !message) return res.sendStatus(401);

  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(402);

  const auth_exist = await users.findOne({ refresh_token: refresh_token });
  if(!auth_exist) return res.sendStatus(403);

  const other_exist = await users.findOne({ username: other_username });
  if(!other_exist) return res.sendStatus(405);

  const auth_messages = auth_exist.connections.find(user => user.username === other_exist.username).messages;
  const other_messages = other_exist.connections.find(user => user.username === auth_exist.username).messages;

  const total_messages = auth_messages.concat(other_messages);
  const sorted_messages = total_messages.sort((a, b) => a.id - b.id);

  const id = sorted_messages[sorted_messages.length - 1]?.id + 1 || 1; 

  const auth_filtered_connections = auth_exist.connections.filter(user => user.username !== other_exist.username);
  const other_connection = auth_exist.connections.find(user => user.username === other_exist.username);

  other_connection.messages.push({
    id,
    message
  });

  const updated_connections = [...auth_filtered_connections, other_connection];
  auth_exist.connections = updated_connections;

  await auth_exist.save();
  res.sendStatus(200);
};

const delete_message_handler = async (req, res) =>
{
  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(401);

  const { receiver_name, message_id } = req.params;
  if(!receiver_name || !message_id) return res.sendStatus(400);

  const sender = await users.findOne({ refresh_token });
  const sender_connections = sender.connections;

  let receiver = sender_connections.find(connection => connection.username === receiver_name);
  const updated_receiver_messages = receiver.messages.filter(message => message.id != message_id);

  receiver.messages = updated_receiver_messages;
  const filtered_sender_connections = sender_connections.filter(connection => connection.username != receiver_name);
  const updated_sender_connections = [...filtered_sender_connections, receiver];

  sender.connections = updated_sender_connections;

  await sender.save();

  return res.sendStatus(200);
};

module.exports = { chat_box_handler, save_message_handler, delete_message_handler }