

export const typeDefs = `
type Mutation {
    users: MutationUsers
}
type MutationUsers { ${require("./User").MutationsDefs} }
`;

export const TypesResolvers = {
    Mutation: {
        users(){ return TypesResolvers.MutationUsers; }
    },
    MutationUsers: { ...require("./User").MutationsResolvers }
}