import { IRoutesConfig } from "app/Services/router"

import Login from "./Login/Login"

export const loadRoutes = (parent = ""): IRoutesConfig[] => {

    return [
        {
            path: parent + "/users/login",
            main: Login
        },
        {
            path: parent + "/login",
            main: Login
        },
        {
            path: parent + "/users/groups",
            main: require("./Groups/Groups").default
        }

    ]

}