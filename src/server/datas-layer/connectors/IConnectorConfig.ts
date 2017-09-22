import { Options } from "sequelize"

export interface IConnectorConfig {
    type: string
    host?: string
    port?: number
    database?: string
    user?: string
    password?: string
    options?: Options
}