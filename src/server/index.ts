import * as Hapi from "hapi"
import * as HapiBasicAuth from "hapi-auth-basic"
import { graphiqlHapi, graphqlHapi, HapiGraphiQLPluginOptions } from "apollo-server-hapi";
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
import { schema as grapgql_schema, AuthCredential, GraphQlContext } from "./routes/graphql"
// -- auth
import { handler_auth, JWTTokenPayload, authModelUser } from "./routes/auth"

// AUTHENTIFICATION BASIC
server.register(HapiBasicAuth, (err) => {
    if(err) throw err;

    server.auth.strategy("basic-authentification", "basic", {
        validateFunc: (request, username, password, callback) => {
            authModelUser({ login: username, password: password }, (result) => {
                if(result.token){
                    if(result.user && result.user.droits && result.user.droits.indexOf(1) > -1)
                        callback(undefined, true, result);
                    else
                        callback(undefined, false, undefined);
                } else {
                    callback(undefined, false, undefined);
                }
            })
        }
    });

    // -- /graphiql
    server.register({
        register: graphiqlHapi,
        options: {
            path: "/graphiql",
            route: {
                description: "GraphiQL Endpoint (documentation)",
                auth: "basic-authentification",
                ext: {
                    onPreResponse: [{
                        method: async (request, reply) => {
                            let _response = request.response;
                            let _token = (request.auth && request.auth.credentials) ? request.auth.credentials.token : undefined;

                            if(_response.isBoom || !_response.source || !_token){
                                return reply.continue();
                            }

                            return reply(request.response.source.replace("</head>", `
                                <script>
                                window.__TOKEN = "${_token}";
                                console.info("A new AccessToken '${_token}' was automatically injected into this debug session.");
                                </script>
                                </head>
                            `))
                        }
                    }]
                }
            },
            graphiqlOptions: {
                endpointURL: "/graphql",
                passHeader: "'Authorization': window.__TOKEN ? 'JWT ' + window.__TOKEN : ''"
            },
        } as HapiGraphiQLPluginOptions
    })
})

// AUTHENTIFICATION JWT
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
                        callback(undefined, true, { 
                            user: {
                                id: payload.user.id,
                                droits: result.user.droits,
                                model: result.userModel
                            }
                        } as AuthCredential);
                    else
                        callback(undefined, false, undefined);
                } else {
                    callback(undefined, false, undefined);
                }
            })

        }
     } as IAuthJwtHapiOptions
    );

    // -- /graphql
    server.register({
        register: graphqlHapi,
        options: {
            path: "/graphql",
            route: {
                auth: "jwt"
            },
            graphqlOptions: (request: Hapi.Request) => {
                
                return {
                    schema: grapgql_schema,
                    context: {
                        auth: request.auth,
                        request: request
                    }
                }
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
    getLogger().debug(`Server running at ${server.info.uri}`);
})