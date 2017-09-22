import * as Sequelize from "sequelize"
import { IConnectorConfig } from "./IConnectorConfig"

export const mysqlConnector = (config: IConnectorConfig) => {
    const connector =  new Sequelize(config.database, config.user, config.password, {
        host: config.host,
        port: config.port,
        dialect: "mysql",
        ...config.options
    })

    connector
        .authenticate()
        .then(() => {
            console.log("Connection etablished to mysql server")
        })
        .catch(err => {
            console.error("Error Connection :", err);
        })


    return connector;
}