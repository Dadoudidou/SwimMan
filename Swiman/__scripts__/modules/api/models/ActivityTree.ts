

    
        import { SectionTree } from "./SectionTree";
    

    import * as assign from "object-assign";

    

    


    class ActivityTree {
        

        
        // ID
        public id: number = 0;
        // NAME
        public name: string = undefined;
        // SECTIONS
        public sections: SectionTree[] = [];

        constructor(init?: Partial<ActivityTree>){
            assign(this, init);
        }
        
    }


export {  ActivityTree }



