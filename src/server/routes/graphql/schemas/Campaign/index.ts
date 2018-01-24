import { schema, schemaGroup } from "./../schema"


const campaign = new schemaGroup([
    {
        typeDefs: `
        type Campaign {
            id: Int
            start: Date
            end: Date
            name: String
            categories: [Category]
        }
        `,
        typeResolvers: {
            Campaign: {
                categories(campaign, args){
                    return campaign.getCategories({ where: args });
                }
            }
        }
    }
])

export default campaign;