import { IRoutesConfig } from "app/Services/router"
import { withDroits } from "app/Services/auth"


export const loadRoutes = (parent = ""): IRoutesConfig[] => {

    return [
        {
            path: parent + "/users/login",
            main: require("./Login/Login").default
        },
        {
            path: parent + "/login",
            main: require("./Login/Login").default
        },
        {
            path: parent + "/users/groups",
            main: withDroits({ droits:[1] })(require("./Groups/List").default)
        },
        {
            path: parent + "/users/permissions",
            main: withDroits({ droits:[1, 4, 5, 7, 6] })(require("./Permissions/Permissions").default)
        },
        {
            path: parent + "/users/users/:id",
            main: withDroits({ droits:[1, 3] })(require("./Users/View").default)
        },
        {
            path: parent + "/users/users",
            main: withDroits({ droits:[1, 3] })(require("./Users/List").default)
        }

    ]

}