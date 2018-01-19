import * as Sequelize from "sequelize"
import { IEntity } from "./../IEntity"
import { IGroupAttributes } from "./Group"
import { ILogAttributes } from "./../System/Log"

export interface IUserAttributes extends Sequelize.Instance<IUserAttributes> {
    id: number
    pseudo: string
    mdp: string
    last_connected: Date
    first_name: string
    last_name: string

    getGroups: (opt?: Sequelize.FindOptions<IGroupAttributes>) => Promise<IGroupAttributes[]>
    setGroups: (values?: IGroupAttributes[]) => Promise<void>
    getLogs: (opt?: Sequelize.FindOptions<ILogAttributes>) => Promise<ILogAttributes[]>
    setLogs: (values?: ILogAttributes[]) => Promise<void>
}

export const GetUserModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    let _model = sequelize.define("users", {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        last_connected: {
            type: DataTypes.DATE
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
    });

    let __model = _model as IEntity<IUserAttributes>;

    __model.associate = (models) => { 
        __model.belongsToMany(models.Group, {
            through: "users_groups_relationships",
            as: "groups",
            foreignKey: "user_id"
        });
        __model.hasMany(models.Log, {
            as: "logs",
            foreignKey: "user_id"
        })
    }

    return __model;
}