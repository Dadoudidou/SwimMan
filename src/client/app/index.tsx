import * as React from "react";
import *  as ReactDOM from "react-dom";

import Application from "./Application";

ReactDOM.render(<Application />, document.getElementById("root"));


// -------------------------------------- TESTS
import { Users, Groups, Permissions } from "./Services/api/actions/Users"
import { makeGraphQlQuery } from "modules/graphql-query"
import { combineGraphqlAction } from "./Services/api/makeRequest"

let groups = Groups({
    request_id: "",
    request: { },
    response: {
        id: null,
        nom: null,
        permissions: {
            id: null,
            name: null
        }
    }
})

let permissions = Permissions({
    request_id: "",
    request: {},
    response: {
        id: null,
        name: null,
        description: null
    }
})

let _action = combineGraphqlAction([
    { actionCreator: groups, alias: "group" } as any,
    { actionCreator: permissions, alias: "permissions" }
])

console.log(_action);
