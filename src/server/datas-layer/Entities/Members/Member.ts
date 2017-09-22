import * as Sequelize from "sequelize"
import { IEntity } from "./../IEntity"

export interface IMemberAttributes {
    id: number
    last_name: string
    first_name: string
    birthday: Date
    male: boolean
    adress: string
    postalcode: string
    city: string
}

export const GetMemberModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    let _model = sequelize.define("members", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        last_name: {
            type: DataTypes.STRING
        },
        first_name: {
            type: DataTypes.STRING
        },
        birthday: {
            type: DataTypes.STRING
        },
        male: {
            type: DataTypes.STRING
        },
        adress: {
            type: DataTypes.STRING
        },
        postalcode: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        }
    });

    let __model = _model as IEntity<IMemberAttributes>;

    __model.associate = (models) => { 
        __model.hasMany(models.MemberMeta, {
            as: "metas",
            foreignKey: "member_id"
        })
    }

    return __model;
}