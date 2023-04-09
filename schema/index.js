const { GraphQLSchema } = require("graphql");
const querySchema = require("./querySchema");
const mutationSchema = require("./mutationSchema");


module.exports = new GraphQLSchema({
    query: querySchema,
    mutation: mutationSchema
})
