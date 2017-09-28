
import { IGroupAttributes } from "./../../../datas-layer/Entities/Users/Group"
import { IPermissionAttributes } from "./../../../datas-layer/Entities/Users/Permission"
import { IUserAttributes } from "./../../../datas-layer/Entities/Users/User"
import { Models, connector } from "./../../../datas-layer"
import * as boom from "boom"

/** Définition des types */
export const typeDefs = `
type User {
    id: Int
    pseudo: String
    first_name: String
    last_name: String
    last_connected: String
    groups: [Group]
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
    user(root, args){
        return Models.User.find({ where: args });
    },
    users(root, args){
        return Models.User.findAll();
    },
    group(root, args){
        return Models.Group.find({ where: args });
    },
    groups(root, args){
        return Models.Group.findAll();
    },
    permission(root, args){
        return Models.Permission.find({ where: args });
    },
    permissions(root, args){
        return Models.Permission.findAll();
    }
}

/** Résolution des modifications */
export const MutationsResolvers = {
    addGroup(root, args){
        return Models.Group.create({
            nom: args.name
        }).then(group => {
            if(!args.permission_ids) return group as any;
            return Models.Permission.findAll({
                where: { id: args.permission_ids }
            }).then(permissions => {
                return (group as any).setPermissions(permissions);
            }).then(() => group)
        });
    },
    updateGroup(root, args){
        return Models.Group.find({
            where: { id: args.id }
        }).then(group => {
            if(!group) throw new Error(`Not found group with id ${args.id}`)
            if(args.name) group.nom = args.name;
            return group.save();
        })
    },
    removeGroup(root, args){
        return Models.Group.find({
            where: { id: args.id }
        }).then(group => {
            if(!group) throw new Error(`Not found group with id ${args.id}`)
            return group.destroy();
        }).then(() => true);
    },
    addPermission(root, args){
        return Models.Permission.create({
            name: args.name,
            description: args.description
        } as IPermissionAttributes);
    },
    updatePermission(root, args){
        return Models.Permission.find({
            where: { id: args.id }
        }).then(permission => {
            if(!permission) throw new Error(`Not found permission with id ${args.id}`)
            if(args.name) permission.name = args.name;
            if(args.description) permission.description = args.description;
            return permission.save();
        })
    },
    removePermission(root, args){
        return Models.Permission.find({
            where: { id: args.id }
        }).then(permission => {
            if(!permission) throw new Error(`Not found permission with id ${args.id}`)
            return permission.destroy();
        }).then(() => true);
    },
    setPermissionsToGroup(root, args){
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
    },
    addUser(root, args){
        return Models.User.create(args.user);
    },
    updateUser(root, args){
        return Models.User.find({ 
            where: { id: args.id }
        }).then(user => {
            if(!user) throw new Error(`Not found user with id ${args.id}`)
            for(let key in args.user){
                user[key] = args.user[key];
            }
            return user.save();
        })
    },
    removeUser(root, args){
        return Models.User.find({ 
            where: { id: args.id }
        }).then(user => {
            if(!user) throw new Error(`Not found user with id ${args.id}`)
            return user.destroy();
        }).then(() => true);
    },
    addUserToGroup(root, args){
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
                    return (user as any).setGroups([...groups, group]).then(() => user);
                })
            })
        });
    },
    removeUserFromGroup(root, {user_id, group_id}){
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
                    return (user as any).setGroups([
                        ...groups.slice(0,_index), 
                        ...groups.slice(_index + 1)
                    ]).then(() => user);
                })
            })
        });
    }
}