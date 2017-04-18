import { actionCreator } from "modules/redux";
import * as ApiModels from "modules/api/models";

export const selectSeason = actionCreator<ApiModels.Season>("application/select_season");
