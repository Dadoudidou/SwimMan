

    

    import * as assign from "object-assign";

    

    


    class Category {
        

        
        // ID
        public id: number = 0;
        // NAME
        public name: string = undefined;

        constructor(init?: Partial<Category>){
            assign(this, init);
        }
        
    }


export {  Category }



