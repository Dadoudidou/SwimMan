import { IRoutesConfig } from "app/Services/router"
import { withDroits } from "app/Services/auth"

export const loadRoutes = (parent = ""): IRoutesConfig[] => {

    return [{
        path: parent + "/test",
        main: require("./index").default
    }]

}