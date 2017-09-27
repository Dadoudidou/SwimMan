import { makeGraphqlRequestCreator } from "modules/redux-actions-graphql"
import { makeFetchRequestCreator } from "modules/redux-actions-fetch"

export const graphQlRequestCreator = makeGraphqlRequestCreator("api");

export const fetchRequestCreator = makeFetchRequestCreator("fetch");