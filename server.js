const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./knexConfig');
const generateToken = require('./tokenConfig');
const restricted = require('./middleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

const registerUrl = '/api/register';
const loginUrl = '/api/login';
const usersUrl = '/api/users';

/* 
============= REGISTER
[POST] request needs to include: 
"username": "string up to 128 chars",
"password": "string up to 255 chars",
"department": "string up to 255 chars",
*/
server.post(registerUrl, (req, res) => {
  const user = req.body;
  const hashed = bcrypt.hashSync(user.password, 10);
  user.password = hashed;

  if (user.username && user.password && user.department) {
    db('users')
      .insert(user)
      .then(id => {
        const token = generateToken(user);
        res.status(201).json({ message: `you are registered ${user.username}`, token });
      })
      .catch(err => {
        res.status(500).json({ message: 'the user could not be added' });
      });
  } else {
    res.status(400).json({
      message: 'please include a username, password, and department ',
    });
  }
});

/* 
============= LOGIN
[POST] request needs to include: 
"username": valid existing username,
"password": a matching password for the username given,
*/
server.post(loginUrl, (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    db('users')
      .where({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: `welcome in ${username}`, token });
        } else {
          res
            .status(401)
            .json({ message: 'the credentials you entered were invalid' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'the user could not be logged in' });
      });
  } else {
    res.status(400).json({ message: 'please include a username and password' });
  }
});

/* 
============= GET USERS
[GET] request needs to include: 
a valid jwt in the Auhorization header
*/
server.get(usersUrl, restricted, (req, res) => {
  const department = req.decodedToken.department;

  db('users')
    .select('id', 'username', 'department')
    .where({ department })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'the users could not be retrieved' });
    });
});

module.exports = server;
