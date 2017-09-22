import * as Sequelize from "sequelize"
import { IEntity } from "./../IEntity"

export interface IPlaceAttributes {
    id: number
    name: string
    adress: string
    postalcode: string
    city: string
}

export const GetPlaceModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    let _model = sequelize.define("activities_places", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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

    let __model = _model as IEntity<IPlaceAttributes>;

    __model.associate = (models) => { 
        __model.hasMany(models.Session, {
            as: "sessions",
            foreignKey: "place_id"
        });
    }

    return __model;
}