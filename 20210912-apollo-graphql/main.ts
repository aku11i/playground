import { ApolloServer } from "apollo-server";
import { Resolvers, User, typeDefs } from "./generated/server";
import * as faker from "faker";

const db = {
  users: new Array(10).fill(null).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    gender: faker.name.gender(),
    age: faker.datatype.number({ min: 0, max: 100 }),
  })) as User[],
};

const resolvers: Resolvers = {
  User: {},
  Query: {
    user: (_, { id }) => db.users.find((_) => _.id === id) || null,
    users: () => db.users,
  },
  Mutation: {
    addUser: (_, { input }) => {
      const user = { ...input, id: faker.datatype.uuid() };
      db.users.push(user);
      return user;
    },
  },
};

const server = new ApolloServer({ resolvers, typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
