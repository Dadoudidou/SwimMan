import { schema } from "./../schema"
import { IUserAttributes } from "datas-layer/Entities/Users/User";
import { withDroit, withOwnProfile } from "routes/graphql/utils/withDroit";
import { Models } from "datas-layer";
import { addHistoric } from "routes/graphql/utils/Historic";

const user: schema<IUserAttributes> = {
    typeDefs:`
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
            login: String
            password: String
            first_name: String
            last_name: String
        }
    `,
    typeResolvers: {
        User: {
            groups: (root, args, context) => {
                return root.getGroups();
            },
            historics: (root, args, context) => {
                return root.getLogs({
                    where: {
                        type: "historic"
                    },
                    order: [
                        ["timestamp", "DESC"]
                    ]
                });
            }
        }
    },

    queryDefs: `
        user(id: Int!): User
        users: [User]
    `,
    queryResolvers: {
        user: withDroit([1], withOwnProfile("id", (root, args) => {
            return Models.User.find({ where: args });
        })),
        users: withDroit([1, 3],(root, args, context) => {
            return Models.User.findAll();
        }),
    },

    mutationDefs: `
        # user manage
        addUser(user: _User!): User
        updateUser(id: Int!, user: _User!): User
        removeUser(id: Int!): Boolean
        addUserToGroup(user_id: Int!, group_id: Int!): User
        removeUserFromGroup(user_id: Int!, group_id: Int!): User
    `,
    mutationResolvers: {
        addUser: withDroit([1],(root, args, context) => {
            return Models.User.create(args.user).then(user => {
                addHistoric(context, `Ajout de l'utilisateur '${user.first_name} ${user.last_name}'`, user);
            });
        }),
        updateUser: withDroit([1],(root, args, context) => {
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
        removeUser: withDroit([1],(root, args, context) => {
            return Models.User.find({ 
                where: { id: args.id }
            }).then(user => {
                if(!user) throw new Error(`Not found user with id ${args.id}`)
                addHistoric(context, `Suppression de l'utilisateur '${user.first_name} ${user.last_name}'`, user);
                return user.destroy();
            }).then(() => true);
        }),
        addUserToGroup: withDroit([1],(root, args, context) => {
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
        removeUserFromGroup: withDroit([1],(root, {user_id, group_id}, context) => {
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
}

export default user;