import { IRoutesConfig } from "app/Services/router"
import { withDroits } from "app/Services/auth"
import { get } from "app/Services/session"

export const loadRoutes = (parent = ""): IRoutesConfig[] => {

    return [
        {
            path: parent + "/system/logs",
            main: withDroits({ droits:[1, 15] })(require("./Logs/List").default)
        }
    ]

}