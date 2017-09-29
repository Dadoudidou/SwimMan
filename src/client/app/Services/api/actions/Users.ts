import { actionAsyncCreator, actionCreator } from "modules/redux-actions"
import { IRequest, IResponse } from "modules/redux-actions-fetch"
import { fetchRequestCreator, graphQlRequestCreator } from "./../makeRequest"
import { IRequest as IRequestGraphQL, IResponse as IResponseGraphQL } from "modules/redux-actions-graphql"
import { makeGraphQlQuery } from "modules/graphql-query"
//import { schema } from "./../schema";

import * as schema from "app/Services/api/schema"



let _apiGlobalName = "api/users/";

interface ILoginInput {
    user: string
    password: string
}
let _apiLogin = _apiGlobalName + "Login";
export const LoginSuccess = actionCreator<IResponse<ILoginInput, any>>(_apiLogin + "success");
export const LoginFailed = actionCreator<IResponse<ILoginInput, any>>(_apiLogin + "error");
export const Login = fetchRequestCreator({
    response: LoginSuccess,
    error: LoginFailed,
    name: _apiLogin,
    uri: "/auth"
});

// ---------------- USERS QUERY ----------------

interface IUserInput { id: number }
let _apiUser = _apiGlobalName + "User";
export const UserSuccess = actionCreator<IResponseGraphQL<IUserInput, schema.UserSchema.IRequestUser, schema.UserSchema.IResponseUser>>(_apiUser + "success");
export const UserFailed = actionCreator<IResponseGraphQL<IUserInput, schema.UserSchema.IRequestUser, schema.UserSchema.IResponseUser>>(_apiUser + "error");
export const User = graphQlRequestCreator<IUserInput, schema.UserSchema.IRequestUser, schema.UserSchema.IResponseUser>({
    name: _apiUser,
    response: UserSuccess,
    error: UserFailed,
    query: (args) => {
        return `query {
            users {
                user(id: ${args.request.id}) {
                    ${makeGraphQlQuery(args.response)}
                }
            }
        }`;
    }
})

interface IUsersInput {}
let _apiUsers = _apiGlobalName + "Users";
export const UsersSuccess = actionCreator<IResponseGraphQL<IUsersInput, schema.UserSchema.IRequestUser, schema.UserSchema.IResponseUser[]>>(_apiUsers + "success");
export const UsersFailed = actionCreator<IResponseGraphQL<IUsersInput, schema.UserSchema.IRequestUser, schema.UserSchema.IResponseUser[]>>(_apiUsers + "error");
export const Users = graphQlRequestCreator<IUsersInput, schema.UserSchema.IRequestUser, schema.UserSchema.IResponseUser[]>({
    name: _apiUsers,
    response: UsersSuccess,
    error: UsersFailed,
    query: (args) => {
        return `query {
            users {
                users {
                    ${makeGraphQlQuery(args.response)}
                }
            }
        }`;
    }
})

// ---------------- USERS MUTATIONS ----------------


// ---------------- GROUPS QUERY ----------------

interface IGroupsInput {}
let _apiGroups = _apiGlobalName + "Groups";
export const GroupsSuccess = actionCreator<IResponseGraphQL<IGroupsInput, schema.UserSchema.IRequestGroup, schema.UserSchema.IResponseGroup[]>>(_apiGroups + "success");
export const GroupsFailed = actionCreator<IResponseGraphQL<IGroupsInput, schema.UserSchema.IRequestGroup, schema.UserSchema.IResponseGroup[]>>(_apiGroups + "error");
export const Groups = graphQlRequestCreator<IGroupsInput, schema.UserSchema.IRequestGroup, schema.UserSchema.IResponseGroup[]>({
    name: _apiGroups,
    response: GroupsSuccess,
    error: GroupsFailed,
    query: (args) => {
        return `query {
            users {
                groups {
                    ${makeGraphQlQuery(args.response)}
                }
            }
        }`;
    }
})

// ---------------- GROUPS MUTATIONS ----------------

// ---------------- PERMISSIONS QUERY ----------------

interface IPermissionsInput {}
let _apiPermissions = _apiGlobalName + "Permissions";
export const PermissionsSuccess = actionCreator<IResponseGraphQL<IPermissionsInput, schema.UserSchema.IRequestPermission, schema.UserSchema.IResponsePermission[]>>(_apiPermissions + "success");
export const PermissionsFailed = actionCreator<IResponseGraphQL<IPermissionsInput, schema.UserSchema.IRequestPermission, schema.UserSchema.IResponsePermission[]>>(_apiPermissions + "error");
export const Permissions = graphQlRequestCreator<IPermissionsInput, schema.UserSchema.IRequestPermission, schema.UserSchema.IResponsePermission[]>({
    name: _apiPermissions,
    response: PermissionsSuccess,
    error: PermissionsFailed,
    query: (args) => {
        return `query {
            users {
                permissions {
                    ${makeGraphQlQuery(args.response)}
                }
            }
        }`;
    }
})

// ---------------- PERMISSIONS MUTATIONS ----------------