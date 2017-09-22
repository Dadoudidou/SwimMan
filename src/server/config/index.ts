import { server } from "./server"
import { connectors } from "./connectors"

export const config = {
    ...server,
    ...connectors
}