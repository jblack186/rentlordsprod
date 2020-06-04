const express = require('express');
const helmet = require('helmet');
var cors = require('cors');

// const helmet = require('helmet');
const server = express();

const bodyParser = require ('body-parser');


server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use(cors({
//   'allowedHeaders': ['Content-Type'],
//   // 'origin': '*',
//   'preflightContinue': true,
//   'Access-Control-Allow-Origin': '*'  
//   //put development heroku link here, * wildcard bad idea, then set up for www.tacklemytrade.com, once we know it works. in access-control-allow-origin 
// }));

const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./models/Issues');
require('./services/passport');
const expressLayouts = require('express-ejs-layouts');



//yo

// server.use(helmet());
// server.use(express.json());

server.use(bodyParser.json());

server.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);



server.use(passport.initialize());
server.use(passport.session());


require('./routes/authRoutes')(server)
require('./routes/issuesRoutes')(server)
require('./routes/profileRoutes')(server)


if (process.env.NODE_ENV === 'production') {
    //first make sure expresss will serve up production assets
    //like our main.js file, or main.css file
    server.use(express.static('rlrds-client/build')); //look into client directory for matching file
  
    //otherwise express will serve up our index.html file
    //if it can't find the file in client/build dir
    const path = require('path');
    server.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'rlrds-client', 'build', 'index.html'));
    });
  }
  

module.exports = server;

