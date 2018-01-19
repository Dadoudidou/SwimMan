
import { IGroupAttributes } from "./../../../datas-layer/Entities/Users/Group"
import { IPermissionAttributes } from "./../../../datas-layer/Entities/Users/Permission"
import { IUserAttributes } from "./../../../datas-layer/Entities/Users/User"
import { Models, connector } from "./../../../datas-layer"
import * as boom from "boom"
import { GraphQlContext } from "./../index"
import { withDroit, withOwnProfile } from "./../utils/withDroit"
import { addHistoric } from "./../utils/Historic"


/** Définition des types */
export const typeDefs = `
type User {
    id: Int
    login: String
    first_name: String
    last_name: String
    last_connected: Date
    groups: [Group]
    historics: [Historic]
}
input _User {
    pseudo: String
    mdp: String
    first_name: String
    last_name: String
}
type Group {
    id: Int
    nom: String
    permissions: [Permission]
    users: [User]
}
type Permission {
    id: Int
    name: String
    description: String
    groups: [Group]
}
type Historic {
    id: Int
    timestamp: String
    message: String
    meta: JSON
}
`

/** Définition des requêtes */
export const QueryDefs = `
user(id: Int!): User
users: [User]
group(id: Int!): Group
groups: [Group]
permission(id: Int!): Permission
permissions: [Permission]
`;

/** Définition des modifications */
export const MutationsDefs = `
    # group manage
    addGroup(name: String!, permission_ids: [Int]): Group
    updateGroup(id: Int!, name: String): Group
    removeGroup(id: Int!): Boolean
    # permission manage
    addPermission(name: String!, description: String): Permission
    updatePermission(id: Int!, name: String, description: String): Permission
    removePermission(id: Int!): Boolean
    setPermissionsToGroup(permission_ids: [Int]!, group_id: Int!): Group
    addPermissionToGroup(permission_id: Int!, group_id: Int!): Group
    removePermissionToGroup(permission_id: Int!, group_id: Int!): Group
    # user manage
    addUser(user: _User!): User
    updateUser(id: Int!, user: _User!): User
    removeUser(id: Int!): Boolean
    addUserToGroup(user_id: Int!, group_id: Int!): User
    removeUserFromGroup(user_id: Int!, group_id: Int!): User
`;

/** Résolution des types */
export const TypesResolvers = {
    User: {
        groups(user: IUserAttributes, args){
            return user.getGroups();
        },
        historics(user: IUserAttributes, args){
            return user.getLogs({
                where: {
                    type: "historic"
                },
                order: [
                    ["timestamp", "DESC"]
                ]
            });
        }
    },
    Group: {
        permissions(group: IGroupAttributes, args){
            return group.getPermissions();
        },
        users(group: IGroupAttributes, args){
            return group.getUsers();
        }
    },
    Permission: {
        groups(permission: IPermissionAttributes, args){
            return (permission as any).getGroups();
        }
    }
}

/** Résolution des requêtes */
export const QueryResolvers = {
    user: withDroit([1], withOwnProfile("id", (root, args) => {
        return Models.User.find({ where: args });
    })),
    users: withDroit([1, 3],(root, args, context: GraphQlContext) => {
        return Models.User.findAll();
    }),
    group: withDroit([1],(root, args) => {
        return Models.Group.find({ where: args });
    }),
    groups: withDroit([1],(root, args) => {
        return Models.Group.findAll();
    }),
    permission: withDroit([1],(root, args) => {
        return Models.Permission.find({ where: args });
    }),
    permissions: withDroit([1],(root, args) => {
        return Models.Permission.findAll();
    })
}

/** Résolution des modifications */
export const MutationsResolvers = {
    addGroup: withDroit([1],(root, args, context: GraphQlContext) => {
        return Models.Group.create({
            nom: args.name
        }).then(group => {
            addHistoric(context, `Création du groupe d'utilisateur '${args.name}'`);
            if(!args.permission_ids) return group as any;
            return Models.Permission.findAll({
                where: { id: args.permission_ids }
            }).then(permissions => {
                return (group as any).setPermissions(permissions);
            }).then(() => group)
        });
    }),
    updateGroup: withDroit([1],(root, args, context: GraphQlContext) => {
        return Models.Group.find({
            where: { id: args.id }
        }).then(group => {
            if(!group) throw new Error(`Not found group with id ${args.id}`)
            if(args.name) group.nom = args.name;
            addHistoric(context, `Modification du groupe d'utilisateur '${group.nom}'`, group);
            return group.save();
        })
    }),
    removeGroup: withDroit([1],(root, args, context: GraphQlContext) => {
        return Models.Group.find({
            where: { id: args.id }
        }).then(group => {
            if(!group) throw new Error(`Not found group with id ${args.id}`)
            addHistoric(context, `Suppression du groupe d'utilisateur '${group.nom}'`, group);
            return group.destroy();
        }).then(() => {
            return true;
        });
    }),
    addPermission: withDroit([1],(root, args, context: GraphQlContext) => {
        return Models.Permission.create({
            name: args.name,
            description: args.description
        } as IPermissionAttributes).then(permission => {
            addHistoric(context, `Création d'un droit utilisateur '${permission.name}'`, permission);
            return permission;
        });
    }),
    updatePermission: withDroit([1],(root, args, context: GraphQlContext) => {
        return Models.Permission.find({
            where: { id: args.id }
        }).then(permission => {
            if(!permission) throw new Error(`Not found permission with id ${args.id}`)
            if(args.name) permission.name = args.name;
            if(args.description) permission.description = args.description;
            addHistoric(context, `Modification d'un droit utilisateur '${permission.name}'`, permission);
            return permission.save();
        })
    }),
    removePermission: withDroit([1],(root, args, context: GraphQlContext) => {
        return Models.Permission.find({
            where: { id: args.id }
        }).then(permission => {
            if(!permission) throw new Error(`Not found permission with id ${args.id}`)
            addHistoric(context, `Suppression d'un droit utilisateur '${permission.name}'`, permission);
            return permission.destroy();
        }).then(() => true);
    }),
    setPermissionsToGroup: withDroit([1],(root, args, context: GraphQlContext) => {
        // -- group
        return Models.Group.find({ 
            where: { id: args.group_id }
        }).then(group => {
            if(!group) throw new Error(`Not found group with id ${args.group_id}`);
            // -- permissions
            return Models.Permission.findAll({
                where: { id: args.permission_ids }
            }).then(permissions => {
                return (group as any).setPermissions(permissions);
            }).then(() => {
                
                return group;
            })
        })
    }),
    addPermissionToGroup: withDroit([1],(root, args, context: GraphQlContext) => {
        return Models.Group.find({
            where: { id: args.group_id }
        }).then(group => {
            if(!group) throw new Error(`Not found group with id ${args.group_id}`)
            return Models.Permission.find({
                where: { id: args.permission_id }
            }).then(permission => {
                if(!permission) throw new Error(`Not found permission with id ${args.permission_id}`)
                return group.getPermissions().then(permissions => {
                    let _index = permissions.map(x => x.id).indexOf(permission.id);
                    if(_index > -1) return group;
                    addHistoric(context, `Ajout du droit '${permission.name}' au groupe ${group.nom}`);
                    return group.setPermissions([...permissions, permission]).then(() => group)
                })
            })
        })
    }),
    removePermissionToGroup: withDroit([1],(root, args, context: GraphQlContext) => {
        return Models.Group.find({
            where: { id: args.group_id }
        }).then(group => {
            if(!group) throw new Error(`Not found group with id ${args.group_id}`)
            return Models.Permission.find({
                where: { id: args.permission_id }
            }).then(permission => {
                if(!permission) throw new Error(`Not found permission with id ${args.permission_id}`)
                return group.getPermissions().then(permissions => {
                    let _index = permissions.map(x => x.id).indexOf(permission.id);
                    if(_index == -1) return group;
                    return group.setPermissions([
                        ...permissions.slice(0, _index),
                        ...permissions.slice(_index + 1)
                    ]).then(() => {
                        addHistoric(context, `Suppression du droit '${permission.name}' du groupe ${group.nom}`);
                        return group;
                    })
                })
            })
        })
    }),
    addUser: withDroit([1],(root, args, context: GraphQlContext) => {
        return Models.User.create(args.user).then(user => {
            addHistoric(context, `Ajout de l'utilisateur '${user.first_name} ${user.last_name}'`, user);
        });
    }),
    updateUser: withDroit([1],(root, args, context: GraphQlContext) => {
        return Models.User.find({ 
            where: { id: args.id }
        }).then(user => {
            if(!user) throw new Error(`Not found user with id ${args.id}`)
            for(let key in args.user){
                user[key] = args.user[key];
            }
            addHistoric(context, `Modification de l'utilisateur '${user.first_name} ${user.last_name}'`, user);
            return user.save();
        })
    }),
    removeUser: withDroit([1],(root, args, context: GraphQlContext) => {
        return Models.User.find({ 
            where: { id: args.id }
        }).then(user => {
            if(!user) throw new Error(`Not found user with id ${args.id}`)
            addHistoric(context, `Suppression de l'utilisateur '${user.first_name} ${user.last_name}'`, user);
            return user.destroy();
        }).then(() => true);
    }),
    addUserToGroup: withDroit([1],(root, args, context: GraphQlContext) => {
        return Models.User.find({ 
            where: { id: args.user_id }
        }).then(user => {
            if(!user) throw new Error(`Not found user with id ${args.user_id}`)
            return Models.Group.find({
                where: { id: args.group_id }
            }).then(group => {
                if(!group) throw new Error(`Not found group with id ${args.group_id}`)
                return user.getGroups().then(groups => {
                    let _index = groups.map(x => x.id).indexOf(group.id);
                    if(_index > -1) return user;
                    addHistoric(context, `Ajout de l'utilisateur '${user.first_name} ${user.last_name}' dans le groupe '${group.nom}'`);
                    return (user as any).setGroups([...groups, group]).then(() => user);
                })
            })
        });
    }),
    removeUserFromGroup: withDroit([1],(root, {user_id, group_id}, context: GraphQlContext) => {
        return Models.User.find({ 
            where: { id: user_id }
        }).then(user => {
            if(!user) throw new Error(`Not found user with id ${user_id}`)
            return Models.Group.find({
                where: { id: group_id }
            }).then(group => {
                if(!group) throw new Error(`Not found group with id ${group_id}`)
                return user.getGroups().then(groups => {
                    let _index = groups.map(x => x.id).indexOf(group.id);
                    if(_index == -1) return user;
                    addHistoric(context, `Suppression de l'utilisateur '${user.first_name} ${user.last_name}' du groupe '${group.nom}'`);
                    return (user as any).setGroups([
                        ...groups.slice(0,_index), 
                        ...groups.slice(_index + 1)
                    ]).then(() => user);
                })
            })
        });
    })
}