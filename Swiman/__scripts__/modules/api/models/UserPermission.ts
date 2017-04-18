

    

    import * as assign from "object-assign";

    

    


    class UserPermission {
        

        
        // ID
        public id: number = 0;
        // NAME
        public name: string = undefined;
        // DESCRIPTION
        public description: string = undefined;

        constructor(init?: Partial<UserPermission>){
            assign(this, init);
        }
        
    }


export {  UserPermission }



