

    

    import * as assign from "object-assign";

    

    


    class Season {
        

        
        // ID
        public id: number = 0;
        // START
        public start: Date = undefined;
        // END
        public end: Date = undefined;

        constructor(init?: Partial<Season>){
            assign(this, init);
        }
        
    }


export {  Season }



