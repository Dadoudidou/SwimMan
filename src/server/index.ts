import * as Hapi from "hapi"
import { graphiqlHapi, graphqlHapi } from "apollo-server-hapi";
import { config } from "./config"

let server = new Hapi.Server();
server.connection(config.server);

// -- register graphql plugin
import { schema as grapgql_schema } from "./routes/graphql"
server.register({
    register: graphqlHapi,
    options: {
        path: "/graphql",
        graphqlOptions: {
            schema: grapgql_schema
        }
    }
})

// -- register graphiql plugin
server.register({
    register: graphiqlHapi,
    options: {
        path: "/graphiql",
        graphiqlOptions: {
            endpointURL: "/graphql"
        }
    }
})

// -- start server
server.start((err) => {
    if(err) throw err;
    console.log(`Server running at ${server.info.uri}`);
})