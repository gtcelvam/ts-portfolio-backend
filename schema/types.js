const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const ImageType = new GraphQLObjectType({
  name: "Image",
  fields: () => ({
    name: { type: GraphQLID },
    data: { type: Buffer },
    contentType: { type: GraphQLString },
  }),
});

const ProfileType = new GraphQLObjectType({
  name: "Profile",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    role: { type: GraphQLString },
    url: {type:GraphQLString}
  }),
});


const SocialLinksType = new GraphQLObjectType({
  name: "Social_Links",
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    link: { type: GraphQLString},
  },
});

module.exports = {ImageType,ProfileType,SocialLinksType}