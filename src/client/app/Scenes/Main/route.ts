import { IRoutesConfig } from "app/Services/router"
import { withDroits } from "app/Services/auth"

export const loadRoutes = (parent = ""): IRoutesConfig[] => {

    return [{
        path: parent + "/main",
        main: withDroits({ droits:[101], redirectTo: "/login" })(require("./index").default)
    }]

}