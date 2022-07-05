const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const TrackAPI = require("./datasource/track-api");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  cors: {
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
  },
  dataSources: () => {
    return {
      TrackAPI: new TrackAPI(),
    };
  },
  resolvers,
});

server.listen().then(({ url, ...rest }) => {
  console.log(`server ready at ${url}`);
});
