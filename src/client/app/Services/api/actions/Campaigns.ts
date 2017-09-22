import { actionAsyncCreator, actionCreator } from "modules/redux-actions"
import { IRequest, IResponse } from "modules/redux-actions-graphql"
import { makeGraphQlQuery } from "modules/graphql-query"
import { graphQlRequestCreator } from "./../makeRequest"

let _apiGlobalName = "api/campaigns/";


interface ICampaignsInput {}
interface ICampaignsOutput {
    id: number
    start: Date
    end: Date
    name: string
}
interface ICampaignsResponse {
    campaigns: Partial<ICampaignsOutput>[]
}
let _apiCampaigns = _apiGlobalName + "Campaigns";
export const CampaignsSuccess = actionCreator<IResponse<ICampaignsInput, ICampaignsOutput, ICampaignsResponse>>(_apiCampaigns + "success");
export const CampaignsFailed = actionCreator<IResponse<ICampaignsInput, ICampaignsOutput, ICampaignsResponse>>(_apiCampaigns + "error");
export const Campaigns = graphQlRequestCreator<ICampaignsInput, ICampaignsOutput, ICampaignsResponse>({
    name: _apiCampaigns,
    error: CampaignsFailed,
    response: CampaignsSuccess,
    query: (args) => {
        return `query { campaigns { ${makeGraphQlQuery(args.response)} } }`;
    }
})