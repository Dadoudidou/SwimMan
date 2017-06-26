

    
        import { User } from "./User";
    

    import * as assign from "object-assign";

    

    


    class Log {
        

        
        // ID
        public id: number = 0;
        // DATE
        public date: Date = undefined;
        // LEVEL
        public level: string = undefined;
        // MESSAGE
        public message: string = undefined;
        // DETAIL
        public detail: string = undefined;
        // USER
        public user: User = undefined;

        constructor(init?: Partial<Log>){
            assign(this, init);
        }
        
    }


export {  Log }



