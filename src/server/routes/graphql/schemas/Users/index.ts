import { schemaGroup } from "./../schema"

import user from "./user"
import permission from "./permission"
import group from "./group"
import historic from "./historic"

export default new schemaGroup([
    user,
    permission,
    group,
    historic
]);