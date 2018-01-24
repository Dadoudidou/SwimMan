import * as Sequelize from "sequelize"
import { IEntity } from "./../IEntity"
import { ISectionAttributes } from "./Section"

export interface IActivityAttributes extends Sequelize.Instance<IActivityAttributes> {
    id: number
    name: string

    getSections: (opt?: Sequelize.FindOptions<ISectionAttributes>) => Promise<ISectionAttributes[]>
    setSections: (values?: ISectionAttributes[]) => Promise<void>
}

export const GetActivityModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    let _model = sequelize.define("activities", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.INTEGER
        }
    });

    let __model = _model as IEntity<IActivityAttributes>;

    __model.associate = (models) => { 
        __model.hasMany(models.Section, {
            as: "sections",
            foreignKey: "activity_id"
        });
        __model.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        });
    }

    return __model;
}