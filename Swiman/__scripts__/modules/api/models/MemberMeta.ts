

    

    import * as assign from "object-assign";

    

    


    class MemberMeta {
        

        
        // COL_KEY
        public col_key: string = undefined;
        // COL_VALUE
        public col_value: string = undefined;

        constructor(init?: Partial<MemberMeta>){
            assign(this, init);
        }
        
    }


export {  MemberMeta }



