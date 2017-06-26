

    
        import { Category } from "./Category";
    

    import * as assign from "object-assign";

    

    


    class Activity {
        

        
        // ID
        public id: number = 0;
        // NAME
        public name: string = undefined;
        // CATEGORY
        public category: Category = undefined;

        constructor(init?: Partial<Activity>){
            assign(this, init);
        }
        
    }


export {  Activity }



