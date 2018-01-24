import { schema } from "./../schema"
import { withDroit, withOwnProfile } from "routes/graphql/utils/withDroit";
import { Models } from "datas-layer";
import { addHistoric } from "routes/graphql/utils/Historic";
import { IPermissionAttributes } from "datas-layer/Entities/Users/Permission";

const permission: schema<IPermissionAttributes> = {
    typeDefs:`
        type Permission {
            id: Int
            name: String
            description: String
            groups: [Group]
        }
    `,
    typeResolvers: {
        Permission: {
            groups(permission, args){
                return (permission as any).getGroups();
            }
        }
    },

    queryDefs: `
        permission(id: Int!): Permission
        permissions: [Permission]
    `,
    queryResolvers: {
        permission: withDroit([1],(root, args) => {
            return Models.Permission.find({ where: args });
        }),
        permissions: withDroit([1],(root, args) => {
            return Models.Permission.findAll();
        })
    },

    mutationDefs: `
        # permission manage
        addPermission(name: String!, description: String): Permission
        updatePermission(id: Int!, name: String, description: String): Permission
        removePermission(id: Int!): Boolean
        setPermissionsToGroup(permission_ids: [Int]!, group_id: Int!): Group
        addPermissionToGroup(permission_id: Int!, group_id: Int!): Group
        removePermissionToGroup(permission_id: Int!, group_id: Int!): Group
    `,
    mutationResolvers: {
        addPermission: withDroit([1],(root, args, context) => {
            return Models.Permission.create({
                name: args.name,
                description: args.description
            } as IPermissionAttributes).then(permission => {
                addHistoric(context, `Création d'un droit utilisateur '${permission.name}'`, permission);
                return permission;
            });
        }),
        updatePermission: withDroit([1],(root, args, context) => {
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
        removePermission: withDroit([1],(root, args, context) => {
            return Models.Permission.find({
                where: { id: args.id }
            }).then(permission => {
                if(!permission) throw new Error(`Not found permission with id ${args.id}`)
                addHistoric(context, `Suppression d'un droit utilisateur '${permission.name}'`, permission);
                return permission.destroy();
            }).then(() => true);
        }),
        setPermissionsToGroup: withDroit([1],(root, args, context) => {
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
        addPermissionToGroup: withDroit([1],(root, args, context) => {
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
        removePermissionToGroup: withDroit([1],(root, args, context) => {
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
        })
    }
}

export default permission;