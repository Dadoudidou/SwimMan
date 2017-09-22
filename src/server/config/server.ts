import { ServerConnectionOptions } from "hapi"

export const server = {
    server: {
        host: "localhost",
        port: "5080",
        routes: {
            cors: true
        }
    } as ServerConnectionOptions
}