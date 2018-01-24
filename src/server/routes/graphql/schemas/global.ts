import { schema, schemaGroup } from "./schema"


const global = new schemaGroup([
    {
        typeDefs: `
        scalar Date
        `,
        typeResolvers: {
            Date: {
                __parseValue(value){
                    return new Date(value);
                },
                __serialize(value: Date){
                    return value.toISOString();
                },
                __parseLiteral(ast){
                    return null;
                }
            }
        }
    },
    {
        typeDefs: `
        scalar JSON
        `,
        typeResolvers: {
            JSON: {
                __parseValue(value){
                    return JSON.stringify(value);
                },
                __serialize(value: any){
                    return JSON.parse(value);
                },
                __parseLiteral(ast){
                    return null;
                }
            }
        }
    }
])

export default global;