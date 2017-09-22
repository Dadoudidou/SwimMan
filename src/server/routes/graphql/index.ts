import { makeExecutableSchema } from "graphql-tools"

var typeDefs = 
require("./schema/Global").typeDefs +
require("./schema/Members").typeDefs +
require("./schema/User").typeDefs +
require("./schema/Activities").typeDefs +
require("./schema/Query").typeDefs;

var resolvers = {
...require("./schema/Global").resolver,
...require("./schema/Members").resolver,
...require("./schema/User").resolver,
...require("./schema/Activities").resolver,
...require("./schema/Query").resolver
}

export const schema = makeExecutableSchema({ typeDefs, resolvers } as any);