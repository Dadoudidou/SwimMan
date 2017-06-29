

    
        import { Season } from "./Season";
    
        import { Category } from "./Category";
    
        import { Activity } from "./Activity";
    
        import { Section } from "./Section";
    

    import * as assign from "object-assign";

    

    


    class OrderAuto {
        

        
        // ID
        public id: number = 0;
        // DATE_FROM
        public date_from: Date = undefined;
        // DATE_TO
        public date_to: Date = undefined;
        // DESCRIPTION
        public description: string = undefined;
        // RESTRICTION_AGE
        public restriction_age: number = undefined;
        // RESTRICTION_AGE_OPERATOR
        public restriction_age_operator: string = undefined;
        // RESTRICTION_DAYS
        public restriction_days: string = undefined;
        // RESTRICTION_MEMBER_NB
        public restriction_member_nb: number = undefined;
        // RESTRICTION_MEMBER_NB_OPERATOR
        public restriction_member_nb_operator: string = undefined;
        // RESTRICTION_ADHESION_NB
        public restriction_adhesion_nb: number = undefined;
        // RESTRICTION_ADHESION_NB_OPERATOR
        public restriction_adhesion_nb_operator: string = undefined;
        // ACTION_AMOUNT_FIX
        public action_amount_fix: number = undefined;
        // ACTION_AMOUNT
        public action_amount: number = undefined;
        // ACTION_AMOUNT_POURCENT
        public action_amount_pourcent: number = undefined;
        // APPLY_ON_MEMBER
        public apply_on_member: boolean = false;
        // APPLY_ON_FAMILY
        public apply_on_family: boolean = false;
        // APPLY_ON_ADHESION
        public apply_on_adhesion: boolean = false;
        // ORDER
        public order: number = 0;
        // SEASON
        public season: Season = undefined;
        // RESTRICTION_CATEGORY
        public restriction_category: Category = undefined;
        // RESTRICTION_ACTIVITY
        public restriction_activity: Activity = undefined;
        // RESTRICTION_SECTION
        public restriction_section: Section = undefined;

        constructor(init?: Partial<OrderAuto>){
            assign(this, init);
        }
        
    }


export {  OrderAuto }



