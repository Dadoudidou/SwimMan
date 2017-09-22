import * as Sequelize from "sequelize"
import { IEntity } from "./../IEntity"

export interface IMemberMetaAttributes {
    member_id: number
    col_key: string
    col_value: string
}

export const GetMemberMetaModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    let _model = sequelize.define("members_metas", {
        member_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        col_key: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        col_value: {
            type: DataTypes.STRING
        }
    });

    let __model = _model as IEntity<IMemberMetaAttributes>;

    __model.associate = (models) => { 
        __model.belongsTo(models.Member, {
            as: "member",
            foreignKey: "member_id"
        })
    }

    return __model;
}