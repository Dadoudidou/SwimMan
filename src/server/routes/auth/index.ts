import * as Hapi from "hapi";
import * as jwt from "jsonwebtoken";
import { config } from "./../../config";
import * as boom from "boom";
import { Models } from "./../../datas-layer"

export const handler_auth = (request: Hapi.Request, reply: Hapi.ReplyNoContinue) => {
    // -- paramètres
    let _user = undefined;
    let _pwd = undefined;
    // -- test method get
    _user = (request.query && request.query.user) ? request.query.user : _user;
    _pwd = (request.query && request.query.password) ? request.query.password : _pwd;
    // -- test payload
    _user = (request.payload && request.payload.user) ? request.payload.user : _user;
    _pwd = (request.payload && request.payload.password) ? request.payload.password : _pwd;

    // -- auth
    Models.User.find({ 
        where: {
            pseudo: _user,
            mdp: _pwd
        }
    }).then(user => {
        if(!user) reply(boom.badRequest("L'identifiant ou le mot de passe n'est pas valide."));
        
        // -- requetes des groupes et permissions
        user.getGroups({ 
            include: [{ model: Models.Permission, as:"permissions" }]
        }).then(groups => {

            // -- liste des droits
            let __permissions_ids = [];
            for(let i=0; i<groups.length; i++){
                __permissions_ids = __permissions_ids.concat( (groups[i] as any).permissions.map(x => x.id) )
            }

            // -- reponse
            reply({
                user: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    droits: __permissions_ids
                },
                token: jwt.sign({ 
                    user: {
                        id: user.id
                    } 
                }, config.secret, {
                    expiresIn: 60*60*24
                })
            })

        });        
    });
}