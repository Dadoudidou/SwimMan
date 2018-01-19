import * as Hapi from "hapi";
import * as jwt from "jsonwebtoken";
import { config } from "./../../config";
import * as boom from "boom";
import { Models } from "./../../datas-layer"
import { IUserAttributes } from "./../../datas-layer/Entities/Users/User"
import { getLogger } from "services/Logger"
import { addHistoric } from "services/Historic"

export type JWTTokenPayload = {
    user: {
        id: number
    }
}



export const authModelUser = (argsUser: any, reply: (reply: any, user?: IUserAttributes) => any) => {
    return Models.User.find({
        where: argsUser
    }).then(user => {
        if(!user) {
            getLogger().warn("Mauvaise identification", { args: argsUser });
            return reply(boom.badRequest("L'identifiant ou le mot de passe n'est pas valide."));
        }
        
        // -- requetes des groupes et permissions
        user.getGroups({ 
            include: [{ model: Models.Permission, as:"permissions" }]
        }).then(groups => {

            // -- liste des droits
            let __permissions_ids = [];
            for(let i=0; i<groups.length; i++){
                __permissions_ids = __permissions_ids.concat( (groups[i] as any).permissions.map(x => x.id) )
            }

            // -- MAJ last connected
            user.last_connected = new Date();
            user.save();

            // -- reponse
            return reply({
                userModel: user,
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    droits: __permissions_ids
                },
                token: jwt.sign(
                    { 
                        user: {
                            id: user.id
                        } 
                    } as JWTTokenPayload, 
                    config.secret, 
                    {
                        expiresIn: 60*60*24
                    }
                )
            }, user)
        });        
    });
}


export const handler_auth = (request: Hapi.Request, reply: Hapi.ReplyNoContinue) => {
    // -- paramètres
    let _user = undefined;
    let _pwd = undefined;
    let _token = undefined;
    // -- test method get
    _user = (request.query && request.query.user) ? request.query.user : _user;
    _pwd = (request.query && request.query.password) ? request.query.password : _pwd;
    _token = (request.query && request.query.token) ? request.query.token : _token;
    // -- test payload
    _user = (request.payload && request.payload.user) ? request.payload.user : _user;
    _pwd = (request.payload && request.payload.password) ? request.payload.password : _pwd;
    _token = (request.payload && request.payload.token) ? request.payload.token : _token;

    // -- test token
    if(_token){
        jwt.verify(_token, config.secret, config.jwtOptions, (err, decoded: any) => {
            if(err) {
                if(err.name.toLowerCase() == "tokenexpirederror") 
                    return reply(boom.unauthorized("Token expired", "Jwt"));
                return reply(boom.unauthorized());
            }
            if(!decoded.user) return reply(boom.unauthorized());
            if(!decoded.user.id) return reply(boom.unauthorized());
            return authModelUser({ id: decoded.user.id }, (obj, user) => {
                return reply(obj);
            });
        })
        return;
    }

    // -- test login password
    return authModelUser({ login: _user, password: _pwd }, (obj, user) => {
        addHistoric(user, "Connection", {
            ip: request.raw.req.connection.remoteAddress
        })
        return reply(obj);
    });
}