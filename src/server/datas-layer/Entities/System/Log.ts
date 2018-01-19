import * as Sequelize from "sequelize"
import { IEntity } from "./../IEntity"
import { IUserAttributes } from "./../Users/User"

export interface ILogAttributes extends Sequelize.Instance<ILogAttributes> {
    id: number
    timestamp: string
    message: string
    meta: string
    level: string
    type: string
    user_id?: number
    getUser: (opt?: Sequelize.FindOptions<IUserAttributes>) => Promise<IUserAttributes>
    setUser: (values?: IUserAttributes) => Promise<void>
}

export const GetLogModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    let _model = sequelize.define("sys_logs", {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        timestamp: {
            type: DataTypes.STRING
        },
        message: {
            type: DataTypes.STRING
        },
        meta: {
            type: DataTypes.STRING
        },
        level: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
    });

    let __model = _model as IEntity<ILogAttributes>;

    __model.associate = (models) => { 
        __model.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        });
    }

    return __model;
}