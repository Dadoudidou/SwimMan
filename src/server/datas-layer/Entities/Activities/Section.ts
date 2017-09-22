import * as Sequelize from "sequelize"
import { IEntity } from "./../IEntity"

export interface ISectionAttributes {
    id: number
    name: string
}

export const GetSectionModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    let _model = sequelize.define("activities_sections", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        activity_id: {
            type: DataTypes.INTEGER
        }
    });

    let __model = _model as IEntity<ISectionAttributes>;

    __model.associate = (models) => { 
        __model.hasMany(models.Session, {
            as: "sessions",
            foreignKey: "section_id"
        });
        __model.belongsTo(models.Activity, {
            as: "activity",
            foreignKey: "activity_id"
        });
    }

    return __model;
}