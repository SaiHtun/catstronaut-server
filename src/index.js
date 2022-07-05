const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const TrackAPI = require("./datasource/track-api");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  cors: {
    origin: [
      "https://catstronaut-client101.herokuapp.com/",
      "https://studio.apollographql.com",
    ],
  },
  dataSources: () => {
    return {
      TrackAPI: new TrackAPI(),
    };
  },
  resolvers,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url, ...rest }) => {
  console.log(`server ready at ${url}`);
});
