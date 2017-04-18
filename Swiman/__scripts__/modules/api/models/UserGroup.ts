

    

    import * as assign from "object-assign";

    

    


    class UserGroup {
        

        
        // ID
        public id: number = 0;
        // NOM
        public nom: string = undefined;

        constructor(init?: Partial<UserGroup>){
            assign(this, init);
        }
        
    }


export {  UserGroup }



