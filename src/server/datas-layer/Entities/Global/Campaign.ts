import * as Sequelize from "sequelize"
import { IEntity } from "./../IEntity"

export interface ICampaignAttributes {
    id: number
    start: Date
    end: Date
    name: string
}

export const GetCampaignModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    let _model = sequelize.define("seasons", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        start: {
            type: DataTypes.DATE
        },
        end: {
            type: DataTypes.DATE
        },
        name: {
            type: DataTypes.STRING
        }
    });

    let __model = _model as IEntity<ICampaignAttributes>;

    __model.associate = (models) => { 
        __model.hasMany(models.Category, {
            as: "categories",
            foreignKey: "season_id"
        });
    }

    return __model;
}