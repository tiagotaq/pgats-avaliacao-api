const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const userResolver = require('./resolvers/userResolver');
const petResolver = require('./resolvers/petResolver');
const jwt = require('jsonwebtoken');
const SECRET = 'supersecret';

const app = express();
app.use(express.json());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: [userResolver, petResolver],
  context: ({ req }) => {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.split(' ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET);
        return { user };
      } catch {
        return {};
      }
    }
    return {};
  },
});

async function startApollo() {
  await server.start();
  server.applyMiddleware({ app });
}

startApollo();

module.exports = app;
