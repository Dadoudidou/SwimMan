import * as Sequelize from "sequelize"
import { IEntity } from "./../IEntity"

export interface ISessionAttributes {
    id: number
    day: number
    start: string
    end: string
    nbSlots: number
}

export const GetSessionModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    let _model = sequelize.define("activities_sessions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        day: {
            type: DataTypes.INTEGER
        },
        start: {
            type: DataTypes.TIME
        },
        end: {
            type: DataTypes.TIME
        },
        nbSlots: {
            type: DataTypes.INTEGER
        },
        place_id: { type: DataTypes.INTEGER },
        section_id: { type: DataTypes.INTEGER }
    });

    let __model = _model as IEntity<ISessionAttributes>;

    __model.associate = (models) => { 
        __model.belongsTo(models.Section, {
            as: "section",
            foreignKey: "section_id"
        });
        __model.belongsTo(models.Place, {
            as: "place",
            foreignKey: "place_id"
        });
    }

    return __model;
}