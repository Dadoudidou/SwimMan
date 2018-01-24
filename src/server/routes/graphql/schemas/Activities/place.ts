import { schema } from "./../schema"
import { UpdateArgs } from "routes/graphql/utils";
import { Models } from "datas-layer";
import { ICategoryAttributes } from "datas-layer/Entities/Activities/Category";

const place: schema<ICategoryAttributes> = {
    typeDefs: `
    type Place {
        id: Int
        name: String
        adress: String
        postalcode: String
        city: String
    }
    `
}

export default place;