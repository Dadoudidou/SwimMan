

    
        import { Activity } from "./Activity";
    

    import * as assign from "object-assign";

    

    


    class Section {
        

        
        // ID
        public id: number = 0;
        // NAME
        public name: string = undefined;
        // ACTIVITY
        public activity: Activity = undefined;

        constructor(init?: Partial<Section>){
            assign(this, init);
        }
        
    }


export {  Section }



