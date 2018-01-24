import { schemaGroup } from "./../schema"

import activity from "./activity"
import category from "./category"
import place from "./place"
import section from "./section"
import session from "./session"

export default new schemaGroup([
    activity,
    category,
    place,
    section,
    session
]);