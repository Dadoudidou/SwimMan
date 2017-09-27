import { IRoutesConfig } from "app/Services/router"
import { withDroits } from "app/Services/auth"

export const loadRoutes = (parent = ""): IRoutesConfig[] => {

    return [{
        path: parent + "/dashboard",
        main: withDroits({ droits:[1], redirectTo: "/login" })(require("./index").default)
    }]

}