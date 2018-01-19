import { GraphQlContext } from "./../index"
export const withDroit = (droits: number[], callback: (root?: any, args?: any, context?: GraphQlContext) => any) => {
    return (_root, _args, _context: GraphQlContext) => {
        let user = _context.auth.credentials.user;
        if(!user) throw new Error("Not authorized");
        if(!user.droits) throw new Error("Not authorized");
        let _auth = true;
        let i = 0;
        while(_auth == true && i < droits.length){
            if(user.droits.indexOf(droits[i]) == -1)
                _auth = false;
            i++;
        }
        if(_auth == false) throw new Error("Not authorized");
        if(callback) return callback(_root, _args, _context);
    }
}

export const withOwnProfile = (userIdArg: string, callback: (root?: any, args?: any, context?: GraphQlContext) => any) => {
    return (_root, _args, _context: GraphQlContext) => {
        let user = _context.auth.credentials.user;
        if(!user) throw new Error("Not authorized");
        if(!_args[userIdArg]) throw new Error("Bad Arguments Request");
        if(user.droits.indexOf(3) > -1) 
            if(callback) 
                return callback(_root, _args, _context);
        if(_args[userIdArg] != user.id) throw new Error("Not authorized");
        if(callback) return callback(_root, _args, _context);
    }
}