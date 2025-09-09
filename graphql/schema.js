const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
  }

  type Pet {
    id: ID!
    name: String!
    type: String!
    userId: ID!
  }

  type Query {
    users: [User]
    pets: [Pet]
    myPets: [Pet]
  }

  type Mutation {
    register(username: String!, password: String!): User
    login(username: String!, password: String!): String
    addPet(name: String!, type: String!): Pet
    deletePet(id: ID!): Boolean
  }
`;
