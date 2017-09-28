import { Models } from "./../../../datas-layer"
import * as sequelize from "sequelize"
import { UpdateArgs } from "./../utils"

export const typeDefs = `
type Query {
    users: QueryUsers
    activities: QueryActivities
    members: QueryMembers
    campaigns: [Campaign]
}

type QueryUsers{
    ${require("./User").QueryDefs}
}

type QueryActivities {
    categories(name: String): [Category]
    category(id: Int!): Category
    activities(name: String): [Activity]
    activity(id: Int!): Activity
    sections(name: String): [Section]
    section(id: Int!): Section
}

input SearchMemberFilter {
    last_name: String
    first_name: String
}

type SearchMemberResult {
    count: Int
    datas: [Member]
    page: Int
    countPerPage: Int
}

type QueryMembers {
    members: [Member]
    member(id: Int!): Member
    search(filter: SearchMemberFilter, orderBy: String, countPerPage: Int = 10, page: Int = 1): SearchMemberResult
}
`

export const resolver = {

    Query: {
        users(){ return resolver.QueryUsers; },
        activities(){ return resolver.QueryActivities; },
        members(){ return resolver.QueryMembers },
        campaigns(){ return Models.Campaign.findAll(); }
    },
    QueryActivities: {
        categories(root, args){
            return Models.Category.findAll({ where: UpdateArgs(args) });
        },
        category(root, args){
            return Models.Category.find({ where: args });
        },
        activities(root, args){
            return Models.Activity.findAll({ where: UpdateArgs(args) });
        },
        activity(root, args){
            return Models.Activity.find({ where: args });
        },
        sections(root, args){
            return Models.Section.findAll({ where: UpdateArgs(args) });
        },
        section(root, args){
            return Models.Section.find({ where: args });
        },
    },
    QueryUsers: { ...require("./User").QueryResolvers },
    QueryMembers: {
        members(root, args){
            return Models.Member.findAll({ where: UpdateArgs(args) });
        },
        member(root, args){
            return Models.Member.find({ where: args });
        },
        search(root, { filter, orderBy, countPerPage, page }){
            if(page <=0 ) page = 1;
            if(countPerPage <= 0) countPerPage = 1;

            return Models.Member.count({ where: UpdateArgs(filter) })
                .then(count => {
                    var _LastPage = Math.ceil(count/countPerPage);
                    if(page > _LastPage) page = _LastPage;
                    return count;
                }).then(count => {
                    return Models.Member.findAll({
                        where: UpdateArgs(filter),
                        limit: countPerPage,
                        offset: (page-1) * countPerPage
                    }).then(result => {
                        return new Promise((resolve, reject) => {
                            return resolve({
                                count: count,
                                datas: result,
                                page: page,
                                countPerPage: countPerPage
                            })
                        })
                    })
                })


           
        }
    }
}