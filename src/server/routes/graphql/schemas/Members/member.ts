import { schema } from "./../schema"
import { IMemberAttributes } from "datas-layer/Entities/Members/Member";
import { Models } from "datas-layer";
import { UpdateArgs } from "routes/graphql/utils";

const member: schema<IMemberAttributes> = {
    typeDefs: `
    type Member {
        id: Int
        last_name: String
        first_name: String
        birthday: Date
        male: Boolean
        adress: String
        postalcode: String
        city: String
        metas: [MemberMeta]
    }
    type MemberMeta {
        col_key: String
        col_value: String
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
    `,
    typeResolvers: {
        Member: {
            metas(member, args){
                return (member as any).getMetas();
            }
        }
    },
    queryDefs: `
    members: [Member]
    member(id: Int!): Member
    search(filter: SearchMemberFilter, orderBy: String, countPerPage: Int = 10, page: Int = 1): SearchMemberResult
    `,
    queryResolvers: {
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

export default member;