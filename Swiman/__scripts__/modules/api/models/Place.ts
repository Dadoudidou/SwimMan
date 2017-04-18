

    

    import * as assign from "object-assign";

    

    


    class Place {
        

        
        // ID
        public id: number = 0;
        // NAME
        public name: string = undefined;
        // ADRESS
        public adress: string = undefined;
        // POSTALCODE
        public postalcode: string = undefined;
        // CITY
        public city: string = undefined;

        constructor(init?: Partial<Place>){
            assign(this, init);
        }
        
    }


export {  Place }



