import * as Sequelize from "sequelize"
import { IEntity } from "./../IEntity"
import { IPermissionAttributes } from "./Permission"
import { IUserAttributes } from "./User"

export interface IGroupAttributes extends Sequelize.Instance<IGroupAttributes> {
    id: number
    nom: string

    getPermissions: (opt?: Sequelize.FindOptions<IPermissionAttributes>) => Promise<IPermissionAttributes[]>
    getUsers: (opt?: Sequelize.FindOptions<IUserAttributes>) => Promise<IUserAttributes[]>

    setUsers: (values?: IUserAttributes[]) => Promise<void>
    setPermissions: (values?: IPermissionAttributes[]) => Promise<void>
}

export const GetGroupModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    let _model = sequelize.define("users_groups", {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING
        }
    });

    let __model = _model as IEntity<IGroupAttributes>;

    __model.associate = (models) => { 
        __model.belongsToMany(models.User, {
            through: "users_groups_relationships",
            as: "users",
            foreignKey: "group_id"
        });
        __model.belongsToMany(models.Permission, {
            through: "users_groups_permissions_relationships",
            as: "permissions",
            foreignKey: "group_id"
        });
    }

    return __model;
}