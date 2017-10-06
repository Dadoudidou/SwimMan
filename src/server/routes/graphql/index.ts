import { makeExecutableSchema } from "graphql-tools"

var typeDefs = 
require("./schema/Global").typeDefs +
require("./schema/Members").typeDefs +
require("./schema/User").typeDefs +
require("./schema/Activities").typeDefs +
require("./schema/Query").typeDefs + 
require("./schema/Mutation").typeDefs;

var resolvers = {
...require("./schema/Global").resolver,
...require("./schema/Members").resolver,
...require("./schema/User").TypesResolvers,
...require("./schema/Activities").resolver,
...require("./schema/Query").resolver,
...require("./schema/Mutation").TypesResolvers
}

export const schema = makeExecutableSchema({ typeDefs, resolvers } as any);

import { AuthCredential } from "../../index"
export type GraphQlContext = {
    auth: {
        isAuthenticated: boolean
        credentials: AuthCredential
    }
}