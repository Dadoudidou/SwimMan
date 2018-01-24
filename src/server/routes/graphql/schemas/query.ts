import { schema, schemaGroup } from "./schema"

import group_users from "./Users"
import group_system from "./System"
import schema_activities from "./Activities"
import schema_campaigns from "./Campaign"
import schema_members from "./Members"
import { Models } from "datas-layer";

const query = new schemaGroup([
    {
        typeDefs: `
        type Query {
            users: QueryUsers
            system: QuerySystem
            activities: QueryActivities
            members: QueryMembers
            campaigns: [Campaign]
        }
        type QueryUsers {
            ${group_users.getQueryDefs()}
        }
        type QuerySystem {
            ${group_system.getQueryDefs()}
        }
        type QueryActivities {
            ${schema_activities.getQueryDefs()}
        }
        type QueryMembers {
            ${schema_members.getQueryDefs()}
        }
        `,
        typeResolvers: {
            Query: {
                users: () => ({ ...group_users.getQueryResolvers() }),
                system: () => ({ ...group_system.getQueryResolvers() }),
                activities: () => ({ ...schema_activities.getQueryResolvers() }),
                members: () => ({ ...schema_members.getQueryResolvers() }),
                campaigns: () => { return Models.Campaign.findAll(); }
            },
            QueryUsers: { ...group_users.getQueryResolvers() },
            QuerySystem: { ...group_system.getQueryResolvers() },
            QueryActivities: { ...schema_activities.getQueryResolvers() },
            QueryMembers: { ...schema_members.getQueryResolvers() }
        }
    }
])

export default query;