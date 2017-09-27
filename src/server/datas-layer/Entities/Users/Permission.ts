import * as Sequelize from "sequelize"
import { IEntity } from "./../IEntity"

export interface IPermissionAttributes {
    id: number
    name: string
    description: string
}

export const GetPermissionModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    let _model = sequelize.define("users_permissions", {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    });

    let __model = _model as IEntity<IPermissionAttributes>;

    __model.associate = (models) => { 
        __model.belongsToMany(models.Group, {
            through: "users_groups_permissions_relationships",
            as: "groups",
            foreignKey: "permission_id"
        });
    }

    return __model;
}