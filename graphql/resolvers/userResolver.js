const userService = require('../../src/service/userService');
const jwt = require('jsonwebtoken');
const SECRET = 'supersecret';

module.exports = {
  Query: {
    users: (parent, args, context) => {
      if (!context.user) throw new Error('Token required');
      return userService.getAllUsers();
    },
  },
  Mutation: {
    register: (parent, { username, password }) => {
      if (!username || !password) throw new Error('Username and password required');
      const user = userService.registerUser(username, password);
      if (!user) throw new Error('User already exists');
      return { id: user.id, username: user.username };
    },
    login: (parent, { username, password }) => {
      if (!username || !password) throw new Error('Username and password required');
      const user = userService.validateUser(username, password);
      if (!user) throw new Error('Invalid credentials');
      return jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
    },
  },
};
