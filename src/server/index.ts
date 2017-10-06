import * as Hapi from "hapi"
import { graphiqlHapi, graphqlHapi } from "apollo-server-hapi";
import { config } from "./config"
import * as jwt from "jsonwebtoken"
import { AuthJWTHapi, IAuthJwtHapiOptions } from "./AuthJWTHapi"
import { getLogger } from "./services/Logger"

let server = new Hapi.Server();
server.connection(config.server);

let checkAuth = (request: Hapi.Request, reply: Hapi.ReplyWithContinue) => {
    // -- vérification authorization
    if(!request.headers.authorization && request.headers.authorization != ""){
        reply({ success: false, message: "no authorization header" });
        return;
    }
    let _auth = request.headers.authorization.split(" ");
    if(_auth.length < 2 || _auth[0] != "JWT"){
        reply({ success: false, message: "bad authorization format" });
        return;
    }

    // -- vérification token
    let _token = _auth[1];
    let _tokenDecoded = undefined;
    jwt.verify(_token, config.secret, (err, decoded) => {
        if(err) reply({ success: false, message: err });

        reply.continue();
    })
}

// -- graphQL
import { schema as grapgql_schema } from "./routes/graphql"
// -- auth
import { handler_auth, JWTTokenPayload, authModelUser } from "./routes/auth"


export type AuthCredential = {
    id: number
    droits: number[]
}

/*server.ext("onRequest", (request, reply) => {
    let _uri = request.path;
    let _method = request.method;
    if(_uri == "/test" && _method == "post"){
        checkAuth(request, reply);
    } else {
        reply.continue();        
    }
})*/

server.register(AuthJWTHapi, (err) => {
    if(err) throw err;

    //enregistrement de la stratégie d'authentification
    server.auth.strategy("jwt", "jwt", { 
        secret: config.secret,
        verifyOptions: config.jwtOptions,
        authorize: (request, payload: JWTTokenPayload, callback) => {
            if(!payload) callback(undefined, false, undefined);
            if(!payload.user) callback(undefined, false, undefined);
            if(!payload.user.id) callback(undefined, false, undefined);
            authModelUser({ id: payload.user.id }, (result) => {
                if(result.token){
                    if(result.user && result.user.droits && result.user.droits.indexOf(1) > -1)
                        callback(undefined, true, { id: payload.user.id, droits: result.user.droits });
                    else
                        callback(undefined, false, undefined);
                } else {
                    callback(undefined, false, undefined);
                }
            })
            //callback(undefined, true, { id: 1 });
        }
     } as IAuthJwtHapiOptions
    );
     // -- /test
    server.route({
        method: "POST",
        path: "/test",
        config: {
            auth: "jwt"
        },
        handler: (request,reply) => {
            reply({
                success: "hello",
                credentials: request.auth.credentials
            })     
        }
    })
    // -- /graphql
    server.register({
        register: graphqlHapi,
        options: {
            path: "/graphql",
            route: {
                auth: "jwt"
            },
            graphqlOptions: request => {
                return {
                    schema: grapgql_schema,
                    context: {
                        auth: request.auth
                    }
                }
            }
        }
    })
    // -- /graphiql
    server.register({
        register: graphiqlHapi,
        options: {
            path: "/graphiql",
            graphiqlOptions: {
                endpointURL: "/graphql"
            }
        }
    })
    // -- /auth
    server.route({
        method: "POST",
        path: "/auth",
        handler: (request, reply) => {
            handler_auth(request, reply);
        }
    });
})



// -- start server
server.start((err) => {
    if(err) {
        getLogger().error(`Error`, err);
        throw err;
    }
    getLogger().info(`Server running at ${server.info.uri}`);
})