import { withDroit } from "./../utils/withDroit"
import { GraphQlContext } from "./../index"
import { Models } from "./../../../datas-layer"
import { ILogAttributes } from "./../../../datas-layer/Entities/System/Log"
import { UpdateArgs } from "./../utils"

/** Définition des types */
export const typeDefs = `
input _logsInput {
    user_id: Int
}

type _logsOutput {
    count: Int
    datas: [Log]
    page: Int
    countPerPage: Int
}

type Log {
    id: Int
    type: String
    timestamp: String
    level: String
    message: String
    meta: JSON
    user: User
}
`;

/** Définition des requêtes */
export const QueryDefs = `
logs(filter: _logsInput, orderBy: String, countPerPage: Int = 10, page: Int = 1): _logsOutput
`;

/** Définition des modifications */
export const MutationsDefs = `
test: Boolean
`;

/** Résolution des types */
export const TypesResolvers = {
    Log: {
        user(Log: ILogAttributes, args){
            if(Log.user_id) return Log.getUser();
            return undefined;
        }
    }
}

/** Résolution des requêtes */
export const QueryResolvers = {
    logs: withDroit([1, 15],(root, { filter, orderBy, countPerPage, page }, context: GraphQlContext) => {
        if(page <=0 ) page = 1;
        if(countPerPage <= 0) countPerPage = 1;

        return Models.Log.count({ 
            where: UpdateArgs(filter) 
        }).then(count => {
            return Models.Log.findAll({
                where: UpdateArgs(filter),
                limit: countPerPage,
                offset: (page-1) * countPerPage,
                order: [["timestamp", "DESC"]]
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
    })
}

/** Résolution des modifications */
export const MutationsResolvers = {
    test(){ return true; }
}