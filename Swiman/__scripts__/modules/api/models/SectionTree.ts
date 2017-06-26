

    

    import * as assign from "object-assign";

    

    


    class SectionTree {
        

        
        // ID
        public id: number = 0;
        // NAME
        public name: string = undefined;

        constructor(init?: Partial<SectionTree>){
            assign(this, init);
        }
        
    }


export {  SectionTree }



