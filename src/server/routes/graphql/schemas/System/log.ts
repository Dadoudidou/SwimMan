import { schema } from "./../schema"
import { ILogAttributes } from "datas-layer/Entities/System/Log";
import { withDroit } from "routes/graphql/utils/withDroit";
import { Models } from "datas-layer";
import { UpdateArgs } from "routes/graphql/utils";

const log: schema<ILogAttributes> = {
    typeDefs:`
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
    `,
    typeResolvers: {
        Log: {
            user(Log: ILogAttributes, args){
                if(Log.user_id) return Log.getUser();
                return undefined;
            }
        }
    },
    queryDefs: `
    logs(filter: _logsInput, orderBy: String, countPerPage: Int = 10, page: Int = 1): _logsOutput
    `,
    queryResolvers: {
        logs: withDroit([1, 15],(root, { filter, orderBy, countPerPage, page }, context) => {
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
}

export default log;