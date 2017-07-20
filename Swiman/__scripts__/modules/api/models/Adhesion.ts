

    
        import { Order } from "./Order";
    
        import { Member } from "./Member";
    
        import { Section } from "./Section";
    
        import { Session } from "./Session";
    

    import * as assign from "object-assign";

    

    


    class Adhesion {
        

        
        // ID
        public id: number = 0;
        // VALIDATE
        public validate: boolean = false;
        // CREATED
        public created: Date = undefined;
        // ORDER
        public order: Order = undefined;
        // MEMBER
        public member: Member = undefined;
        // SECTION
        public section: Section = undefined;
        // SESSIONS
        public sessions: Session[] = [];

        constructor(init?: Partial<Adhesion>){
            assign(this, init);
        }
        
    }


export {  Adhesion }



