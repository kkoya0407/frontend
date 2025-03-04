// backend/schemas/schema.js
const graphql = require('graphql');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const hashedPassword = await bcrypt.hash(args.password, 12);
        let user = new User({
          username: args.username,
          password: hashedPassword,
        });
        return user.save();
      },
    },
    loginUser: {
      type: GraphQLString,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const user = await User.findOne({ username: args.username });
        if (!user) {
          throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(args.password, user.password);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ userId: user.id }, 'secretkey', {
          expiresIn: '1h',
        });
        return token;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});