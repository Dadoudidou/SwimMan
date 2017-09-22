import * as Sequelize from "sequelize"
import { IEntity } from "./../IEntity"

export interface ICategoryAttributes {
    id: number
    name: string
}

export const GetCategoryModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    let _model = sequelize.define("activities_categories", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        season_id: {
            type: DataTypes.INTEGER
        }
    });

    let __model = _model as IEntity<ICategoryAttributes>;

    __model.associate = (models) => { 
        __model.hasMany(models.Activity, { 
            as: "activities",
            foreignKey: "category_id"
        });
        __model.belongsTo(models.Campaign, {
            as: "campaign",
            foreignKey: "season_id"
        })
    }

    return __model;
}