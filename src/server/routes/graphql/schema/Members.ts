import { UpdateArgs } from "./../utils"

export const typeDefs = `
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
`

export const resolver = {
    Member: {
        metas(member, args){
            return member.getMetas();
        }
    }
}