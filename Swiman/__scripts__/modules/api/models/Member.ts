

    
        import { MemberMeta } from "./MemberMeta";
    

    import * as assign from "object-assign";

    

    


    class Member {
        

        
        // ID
        public id: number = 0;
        // LAST_NAME
        public last_name: string = undefined;
        // FIRST_NAME
        public first_name: string = undefined;
        // BIRTHDAY
        public birthday: Date = undefined;
        // MALE
        public male: boolean = false;
        // ADRESS
        public adress: string = undefined;
        // POSTALCODE
        public postalcode: string = undefined;
        // CITY
        public city: string = undefined;
        // METAS
        public metas: MemberMeta[] = [];

        constructor(init?: Partial<Member>){
            assign(this, init);
        }
        
    }


export {  Member }



