const resolvers = {
  Query: {
    tracksForHome: async (_, __, { dataSources }) => {
      return await dataSources.TrackAPI.getTracksForHome();
    },
    track: async (_, args, { dataSources }) => {
      return await dataSources.TrackAPI.getTrack(args.id);
    },
  },
  Mutation: {
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.TrackAPI.incrementTrackViews(id);

        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track id: ${id}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
  },
  Track: {
    author: async (parent, _, { dataSources }) => {
      return await dataSources.TrackAPI.getAuthor(parent.authorId);
    },
    modules: async (parent, _, { dataSources }) => {
      //   const promises = parent.modules.map((module) =>
      //     dataSources.TrackAPI.getModule(module)
      //   );

      //   return await Promise.all(promises);
      return await dataSources.TrackAPI.getModule(parent.id);
    },
  },
};

module.exports = resolvers;
