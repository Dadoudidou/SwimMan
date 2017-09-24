import * as Hapi from "hapi"
import { graphiqlHapi, graphqlHapi } from "apollo-server-hapi";
import { config } from "./config"
import * as jwt from "jsonwebtoken"

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

server.ext("onRequest", (request, reply) => {
    let _uri = request.path;
    let _method = request.method;
    if(_uri == "/test" && _method == "post"){
        checkAuth(request, reply);
    } else {
        reply.continue();        
    }
})

server.route({
    method: "POST",
    path: "/test",
    handler: (request,reply) => {
        reply({
            success: "hello"
        })     
    }
})

server.route({
    method: "POST",
    path: "/auth",
    handler: (request, reply) => {
        //paramètres GET QUERY
        let _user = request.query.user;
        let _pwd = request.query.password;
        _user = (request.payload.user) ? request.payload.user : _user;
        _pwd = (request.payload.password) ? request.payload.password : _pwd;
        if(_user == "dadou" && _pwd == "dadou"){
            reply({
                success: true,
                message: "",
                token: jwt.sign({ userid: 1 }, config.secret, {
                    expiresIn: 60*60*5
                })
            })
        } else {
            reply({
                success: false,
                message: ""
            })
        }
    }
});

// -- start server
server.start((err) => {
    if(err) throw err;
    console.log(`Server running at ${server.info.uri}`);
})