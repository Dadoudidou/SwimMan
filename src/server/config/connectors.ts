import { IConnectorConfig } from "./../datas-layer/connectors/IConnectorConfig"

export const connectors = {
    connectors: {
        default: {
            type: "mysql",
            host: "localhost",
            port: 3306,
            database: "myassoc",
            user: "root",
            password: undefined,
            options: {
                define: {
                    timestamps: false
                }
            }
        } as IConnectorConfig
    }
}