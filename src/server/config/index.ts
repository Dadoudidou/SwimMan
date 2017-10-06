import { server } from "./server"
import { connectors } from "./connectors"
import * as jwt from "jsonwebtoken"

export const config = {
    secret: "2#^>G.QDm+~][Xa",
    jwtOptions: undefined as jwt.VerifyOptions,
    ...server,
    ...connectors
}