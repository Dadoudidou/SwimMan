

export const typeDefs = `
type Mutation {
    users: MutationUsers
    system: MutationSystem
}
type MutationUsers { ${require("./User").MutationsDefs} }
type MutationSystem { ${require("./System").MutationsDefs} }
`;

export const TypesResolvers = {
    Mutation: {
        users(){ return TypesResolvers.MutationUsers; },
        system(){ return TypesResolvers.MutationSystem; }
    },
    MutationUsers: { ...require("./User").MutationsResolvers },
    MutationSystem: { ...require("./System").MutationsResolvers }
}