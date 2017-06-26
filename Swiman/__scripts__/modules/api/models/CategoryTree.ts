

    
        import { ActivityTree } from "./ActivityTree";
    

    import * as assign from "object-assign";

    

    


    class CategoryTree {
        

        
        // ID
        public id: number = 0;
        // NAME
        public name: string = undefined;
        // ACTIVITIES
        public activities: ActivityTree[] = [];

        constructor(init?: Partial<CategoryTree>){
            assign(this, init);
        }
        
    }


export {  CategoryTree }



