import * as Sequelize from "sequelize"
import { IEntity } from "./../IEntity"

export interface IUserAttributes {
    id: number
    pseudo: string
    mdp: string
    last_connected: Date
}

export const GetUserModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    let _model = sequelize.define("users", {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        pseudo: {
            type: DataTypes.STRING
        },
        mdp: {
            type: DataTypes.STRING
        },
        last_connected: {
            type: DataTypes.DATE
        }
    });

    let __model = _model as IEntity<IUserAttributes>;

    __model.associate = (models) => { }

    return __model;
}