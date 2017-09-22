import { UpdateArgs } from "./../utils"

export const typeDefs = `
type Activity {
    id: Int
    name: String
    category: Category
    sections(name: String): [Section]
}
type Category {
    id: Int
    name: String
    activities(name: String): [Activity]
    activities_count(name: String): Int
    campaign: Campaign
}
type Section {
    id: Int
    name: String
    activity: Activity
    sessions: [Session]
}
type Session {
    id: Int
    day: Int
    start: String
    end: String
    nbSlots: Int
    section: Section
    place: Place
}
type Place {
    id: Int
    name: String
    adress: String
    postalcode: String
    city: String
}
`

export const resolver = {
    Category: {
        activities(category, args){
            let __args = UpdateArgs(args);
            return category.getActivities({ where: __args });
        },
        activities_count(category, args){
            let __args = UpdateArgs(args);
            return category.getActivities({ where: __args }).then(result => result.length);
        },
        campaign(category, args){
            return category.getCampaign();
        }
    },
    Activity: {
        category(activity){
            return activity.getCategory();
        },
        sections(activity, args){
            let __args = UpdateArgs(args);
            return activity.getSections({ where: __args });
        }
    },
    Section: {
        activity(section){
            return section.getActivity();
        },
        sessions(section, args){
            let __args = UpdateArgs(args);
            return section.getSessions({ where: __args });
        }
    },
    Session: {
        section(session){
            return session.getSection();
        },
        place(session){
            return session.getPlace();
        }
    }
}