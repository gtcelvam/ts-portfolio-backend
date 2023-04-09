const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require("graphql");
const profileSchema = require("../modals/profileSchema");
const { handleProfileData } = require("../utils/helpers");
const socialSchema = require("../modals/socialSchema");
const { SocialLinksType, ProfileType } = require("./types");



const querySchema = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    profile: {
      type: ProfileType,
      resolve: async () => {
        let data = await profileSchema.find();
        return handleProfileData(data);
      },
    },
    socialLinks: {
      type: new GraphQLList(SocialLinksType),
      resolve: async () => {
        let data = await socialSchema.find();
        return data;
      }
    }
  },
});

module.exports = querySchema;
