

    
        import { Season } from "./Season";
    
        import { Category } from "./Category";
    
        import { Activity } from "./Activity";
    
        import { Section } from "./Section";
    

    import * as assign from "object-assign";

    

    


    class Order {
        

        
        // ID
        public id: number = 0;
        // LABEL
        public label: string = undefined;
        // DATE_FROM
        public date_from: Date = undefined;
        // DATE_TO
        public date_to: Date = undefined;
        // RESTRICTION_SESSION_MIN
        public restriction_session_min: number = undefined;
        // RESTRICTION_SESSION_MAX
        public restriction_session_max: number = undefined;
        // RESTRICTION_SECTION_ID
        public restriction_section_id: number = undefined;
        // RESTRICTION_ACTIVITY_ID
        public restriction_activity_id: number = undefined;
        // RESTRICTION_CATEGORY_ID
        public restriction_category_id: number = undefined;
        // IS_CARD
        public is_card: boolean = false;
        // CARD_NB_SESSION
        public card_nb_session: number = 0;
        // AMOUNT
        public amount: number = 0;
        // SEASON_ID
        public season_id: number = 0;
        // SEASON
        public season: Season = undefined;
        // CATEGORY
        public category: Category = undefined;
        // ACTIVITY
        public activity: Activity = undefined;
        // SECTION
        public section: Section = undefined;

        constructor(init?: Partial<Order>){
            assign(this, init);
        }
        
    }


export {  Order }



