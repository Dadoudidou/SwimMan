import { GraphQlContext } from "./../index"
export const withDroit = (droits: number[], callback: (root?: any, args?: any, context?: GraphQlContext) => any) => {
    return (_root, _args, _context: GraphQlContext) => {
        let user = _context.auth.credentials;
        if(!user) return false;
        if(!user.droits) return false;
        let _auth = true;
        let i = 0;
        while(_auth == true && i < droits.length){
            if(user.droits.indexOf(droits[i]) == -1)
                _auth = false;
            i++;
        }
        if(_auth == false) throw new Error("Not authorized");
        if(callback) callback(_root, _args, _context);
    }
}