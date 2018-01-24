import { schema } from "./../schema"
import { withDroit, withOwnProfile } from "routes/graphql/utils/withDroit";
import { Models } from "datas-layer";
import { addHistoric } from "routes/graphql/utils/Historic";
import { IGroupAttributes } from "datas-layer/Entities/Users/Group";

const group: schema<IGroupAttributes> = {
    typeDefs:`
        type Group {
            id: Int
            nom: String
            permissions: [Permission]
            users: [User]
        }
    `,
    typeResolvers: {
        Group: {
            permissions(group, args){
                return group.getPermissions();
            },
            users(group, args){
                return group.getUsers();
            }
        },
    },

    queryDefs: `
        group(id: Int!): Group
        groups: [Group]
    `,
    queryResolvers: {
        group: withDroit([1],(root, args) => {
            return Models.Group.find({ where: args });
        }),
        groups: withDroit([1],(root, args) => {
            return Models.Group.findAll();
        })
    },

    mutationDefs: `
        # group manage
        addGroup(name: String!, permission_ids: [Int]): Group
        updateGroup(id: Int!, name: String): Group
        removeGroup(id: Int!): Boolean
    `,
    mutationResolvers: {
        addGroup: withDroit([1],(root, args, context) => {
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
        updateGroup: withDroit([1],(root, args, context) => {
            return Models.Group.find({
                where: { id: args.id }
            }).then(group => {
                if(!group) throw new Error(`Not found group with id ${args.id}`)
                if(args.name) group.nom = args.name;
                addHistoric(context, `Modification du groupe d'utilisateur '${group.nom}'`, group);
                return group.save();
            })
        }),
        removeGroup: withDroit([1],(root, args, context) => {
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
    }
}

export default group;