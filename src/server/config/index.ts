import { server } from "./server"
import { connectors } from "./connectors"

export const config = {
    secret: "2#^>G.QDm+~][Xa",
    ...server,
    ...connectors
}