import * as ApiModels from "app/Services/models"
import { get } from "app/Services/session"

export const authorize = (droits: number[], callback: (auth: boolean) => void) => {
    
    

    let _user: ApiModels.Utilisateur = get("user");


    if(!_user) { callback(false); return; }
    if(!_user.droits) { callback(false); return; }
    
    let _auth = true;
    let i = 0;
    while(_auth == true && i < droits.length){
        if(_user.droits.indexOf(droits[i]) == -1)
            _auth = false;
        i++;
    }

    callback(_auth);
}