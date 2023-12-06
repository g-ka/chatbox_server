require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3500;

// Third-party middleware(s) imports:
const CORS = require('cors');
const cookie_parser = require('cookie-parser');

// Inter-links:
// 1) Configuration:
const CORS_options = require('./configuration/CORS_options');
const mongodb_connection = require('./configuration/Mongodb_connection');
// 2) Middleware:
const Credentials = require('./middleware/Credentials');
const Req_logger = require('./middleware/Req_logger');
// 3) Routes:
const Session_check = require('./routes/Session_check');
const Sign_up = require('./routes/Sign_up');
const Sign_in = require('./routes/Sign_in');
const Fetch_users = require('./routes/Fetch_users');
const Connections = require('./routes/Connections');
const Req_sent = require('./routes/Req_sent');
const Req_recieved = require('./routes/Req_recieved');
const Chat_box = require('./routes/Chat_box');
const Sign_out = require('./routes/Sign_out');
const Unmatched = require('./routes/Unmatched');

// MongoDB connection: 
mongodb_connection();

// Custom middleware for logging the req's method and path in console:
app.use(Req_logger);

// Setting 'Acess-Control-Allowed-Origins' header to 'true' for all allowed origins:
app.use(Credentials);  

// Third-party CORS middleware:
app.use(CORS(CORS_options));

// Third-party cookie-parsing middleware:
app.use(cookie_parser());

// Express in-built middleware for parsing place_holders from URL:
app.use(express.urlencoded({ extended: false }));

// Express in-built middleware for parsing JSON paylod:
app.use(express.json());

// Express in-built middleware for routing static files:
app.use(express.static(path.join(__dirname, '/public')));

app.use('/session_check', Session_check);
app.use('/sign_up', Sign_up);
app.use('/sign_in', Sign_in);
app.use('/fetch_users', Fetch_users);
app.use('/connections', Connections);
app.use('/req_sent', Req_sent);
app.use('/req_recieved', Req_recieved);
app.use('/chat_box', Chat_box);
app.use('/sign_out', Sign_out);
app.all('*', Unmatched);

mongoose.connection.once('open', () =>
{
  console.log('Connected to MongoDB');

  app.listen(PORT, () =>
  {
    console.log('The server is running in port: '+PORT);
  });
});