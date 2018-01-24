import { schema, schemaGroup } from "./schema"

import group_users from "./Users"
import group_system from "./System"
import schema_activities from "./Activities"
import schema_campaigns from "./Campaign"

const mutation = new schemaGroup([
    {
        typeDefs: `
        type Mutation {
            users: MutationUsers
        }
        type MutationUsers {
            ${group_users.getMutationDefs()}
        }
        `,
        typeResolvers: {
            Mutation: {
                users: () => ({ ...group_users.getMutationResolvers() })
            },
            MutationUsers: { ...group_users.getMutationResolvers() }
        }
    }
])

export default mutation;