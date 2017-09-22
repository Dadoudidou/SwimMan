import * as Sequelize from "sequelize"
import { IModels } from "./../index"

export interface IEntity<T> extends Sequelize.Model<T, any>{
    associate?: (models: IModels) => void
}