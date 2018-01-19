import { IRoutesConfig } from "app/Services/router"
import { withDroits } from "app/Services/auth"
import { get } from "app/Services/session"

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
            main: withDroits({ droits:[1, 11, 12, 13, 14] })(require("./Groups/List").default)
        },
        {
            path: parent + "/users/permissions",
            main: withDroits({ droits:[1, 4, 5, 7, 6] })(require("./Permissions/Permissions").default)
        },
        {
            path: parent + "/users/users/:id",
            main: withDroits({ 
                droits:[1],
                authorize: (auth, props, callback) => {
                    if(!auth) return callback(auth);
                    let _user = get("user");
                    if(!_user) return callback(false);
                    if(!_user.droits) return callback(false);
                    if(!props) return callback(false);
                    if(!props.match) return callback(false);
                    if(!props.match.params) return callback(false);
                    if(!props.match.params.id) return callback(false);

                    // -- droit de voir les utilisateurs
                    if(_user.droits.indexOf(3) > -1)
                        return callback(true);
                    
                    // -- droit de voir son profil
                    console.log(props, _user);
                    if(String(props.match.params.id) == String(_user.id))
                        return callback(true);

                    return callback(false);
                }
            })(require("./Users/View").default)
        },
        {
            path: parent + "/users/users",
            main: withDroits({ droits:[1, 3] })(require("./Users/List").default)
        }

    ]

}