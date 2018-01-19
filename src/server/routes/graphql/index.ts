import { makeExecutableSchema } from "graphql-tools"
import * as Hapi from "hapi"

var typeDefs = 
require("./schema/Global").typeDefs +
require("./schema/Members").typeDefs +
require("./schema/User").typeDefs +
require("./schema/Activities").typeDefs +
require("./schema/Query").typeDefs + 
require("./schema/Mutation").typeDefs +
require("./schema/System").typeDefs;

var resolvers = {
...require("./schema/Global").resolver,
...require("./schema/Members").resolver,
...require("./schema/User").TypesResolvers,
...require("./schema/Activities").resolver,
...require("./schema/Query").resolver,
...require("./schema/Mutation").TypesResolvers,
...require("./schema/System").TypesResolvers
}

export const schema = makeExecutableSchema({ typeDefs, resolvers } as any);

import { IUserAttributes } from "./../../datas-layer/Entities/Users/User"

export type AuthCredential = {
    user: {
        id: number
        droits: number[]
        model: IUserAttributes
    }
}

export type GraphQlContext = {
    auth: {
        isAuthenticated: boolean
        credentials: AuthCredential
    }
    request: Hapi.Request
}