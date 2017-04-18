

    
        import { UserGroup } from "./UserGroup";
    

    import * as assign from "object-assign";

    

    


    class User {
        

        
        // ID
        public id: number = 0;
        // USERNAME
        public username: string = undefined;
        // PERMISSIONS
        public permissions: number[] = [];
        // GROUPS
        public groups: UserGroup[] = [];

        constructor(init?: Partial<User>){
            assign(this, init);
        }
        
    }


export {  User }



