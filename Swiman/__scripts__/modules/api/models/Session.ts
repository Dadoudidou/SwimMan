

    
        import { Place } from "./Place";
    
        import { Section } from "./Section";
    

    import * as assign from "object-assign";

    

    


    class Session {
        

        
        // ID
        public id: number = 0;
        // DAY
        public day: number = 0;
        // START
        public start: string = undefined;
        // END
        public end: string = undefined;
        // NBSLOTS
        public nbSlots: number = 0;
        // PLACE
        public place: Place = undefined;
        // SECTION
        public section: Section = undefined;

        constructor(init?: Partial<Session>){
            assign(this, init);
        }
        
    }


export {  Session }



