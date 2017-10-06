import * as ApiModels from "app/Services/models"
import { get, set } from "app/Services/session"
import { ApiActions } from "app/Services/api"
import { getStore } from "./../../store"

const testDroits = (user: { droits: number[] }, droits: number[]) => {
    if(!user) return false;
    if(!user.droits) return false;
    let _auth = true;
    let i = 0;
    while(_auth == true && i < droits.length){
        if(user.droits.indexOf(droits[i]) == -1)
            _auth = false;
        i++;
    }
    return _auth;
}

export const authorize = (droits: number[], callback: (auth: boolean) => void) => {
    
    // -- si l'utilisateur existe en session
    // ---- tests des droits
    // -- sinon un token est enregistré en localstorage
    // ---- requete pour récupérer l'utilisateur
    // ---- tests des droits de l'utilisateur
    // -- sinon retourne false

    let _user: ApiModels.Utilisateur = get("user");

    if(!_user){
        let _token = localStorage.getItem("__token");
        if(!_token) return callback(false);

        (getStore().dispatch(ApiActions.Users.Login({
            request_id: "authentification",
            request: { token: _token }
        })) as any).then(data => {
            if(data && data.token){
                set("user", data.user);
                set("token", data.token);
                localStorage.setItem("__token", data.token);
                return callback(testDroits(data.user, droits));
            }
            return callback(false);
        })
        return;
    }

    return callback(testDroits(_user, droits));
}