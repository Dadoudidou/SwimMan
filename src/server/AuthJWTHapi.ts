import * as Hapi from "hapi"
import * as jwt from "jsonwebtoken"
import * as Boom from "boom";


export interface IAuthJwtHapiOptions {
    secret: string
    verifyOptions?: jwt.VerifyOptions
    authorize: (request: Hapi.Request, payload: any, callback: ((err, isValid, credentials) => void)) => void

}

export const AuthJWTHapi: Hapi.PluginFunction<any> = (server: Hapi.Server, options: IAuthJwtHapiOptions, next: (err?: Error) => void) => {
    server.auth.scheme("jwt", internals.implementation)
    next();
}

AuthJWTHapi.attributes = {
    name: "AuthJWTHapi"
}

const internals = {
    implementation: (server: Hapi.Server, options: IAuthJwtHapiOptions): Hapi.SchemeMethodResult => {
        return {
            authenticate:(request, reply) => {

                // -- vérification authorization
                const req = request.raw.req;
                const authorization = req.headers.authorization as string;
                if(!authorization){
                    return reply(Boom.unauthorized(undefined, "Jwt"));
                }

                const parts = authorization.split(/\s+/);
                if(parts[0].toLowerCase() !== "jwt"){
                    return reply(Boom.unauthorized(undefined, "Jwt"));
                }

                if(parts.length !== 2){
                    return reply(Boom.badRequest('Bad HTTP authentication header format', 'Jwt'));
                }


                // -- vérification token
                let _token = parts[1];
                let _tokenDecoded = undefined;
                jwt.verify(_token, options.secret, options.verifyOptions, (err, decoded) => {
                    if(err)  {

                        if(err.name.toLowerCase() == "tokenexpirederror"){
                            return reply(Boom.unauthorized("Token expired", "Jwt"))
                        }

                        if(err.name.toLowerCase() == "jsonwebtokenerror"){
                            return reply(Boom.unauthorized(err.message, "Jwt"));
                        }

                        return reply(Boom.unauthorized(err.message, "Jwt"));
                    }

                    options.authorize(request, decoded, (err, isValid, credentials) => {
                        if(err){
                            return reply(err, undefined, { credentials: credentials });
                        }

                        if(!isValid){
                            return reply(Boom.unauthorized('Bad authentification', "Jwt"), undefined, { credentials: credentials });
                        }

                        if(!credentials){
                            return reply(Boom.badImplementation("Bad credential object"));
                        }

                        // -- authenticated
                        return reply.continue({ credentials: credentials });
                    })
                })
            }
        }
    }
}