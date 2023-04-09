const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = require("graphql");
const socialSchema = require("../modals/socialSchema");
const { SocialLinksType } = require("./types");

const mutationSchema = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    addSocialLinks: {
      type: SocialLinksType,
      args: {
        name: { type: GraphQLString},
        link: { type: GraphQLString},
      },
      resolve: async (parents, args) => {
        let socialData = {
          name: args.name,
          link: args.link,
        };
        try {
          const socilaLinkResult = new socialSchema(socialData);
          return await socilaLinkResult.save();
        } catch (error) {
          throw error
        }
      },
    },
  },
});

module.exports = mutationSchema;
