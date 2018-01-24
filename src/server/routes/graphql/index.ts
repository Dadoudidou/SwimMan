import { makeExecutableSchema } from "graphql-tools"
import * as Hapi from "hapi"


import schema_query from "./schemas/query";
import schema_mutation from "./schemas/mutation";
import schema_global from "./schemas/global"

import schema_users from "./schemas/Users";
import schema_system from "./schemas/System";
import schema_activities from "./schemas/Activities"
import schema_campaigns from "./schemas/Campaign"
import schema_members from "./schemas/Members"
/*
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
...require("./schema/Members").resolvers,
...require("./schema/User").TypesResolvers,
...require("./schema/Activities").TypesResolvers,
...require("./schema/Query").resolver,
...require("./schema/Mutation").TypesResolvers,
...require("./schema/System").TypesResolvers
}
*/

var typeDefs = `
    ${schema_global.getTypeDefs()}
    ${schema_query.getTypeDefs()}
    ${schema_mutation.getTypeDefs()}
    ${schema_users.getTypeDefs()}
    ${schema_system.getTypeDefs()}
    ${schema_activities.getTypeDefs()}
    ${schema_campaigns.getTypeDefs()}
    ${schema_members.getTypeDefs()}
`;
var resolvers = {
    ...schema_global.getTypeResolvers(),
    ...schema_query.getTypeResolvers(),
    ...schema_mutation.getTypeResolvers(),
    ...schema_users.getTypeResolvers(),
    ...schema_system.getTypeResolvers(),
    ...schema_activities.getTypeResolvers(),
    ...schema_campaigns.getTypeResolvers(),
    ...schema_members.getTypeResolvers()
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