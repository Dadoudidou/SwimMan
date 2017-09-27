import { config } from "./../config";
import { mysqlConnector } from "./connectors/mysqlConnector"

//connection bdd
let connector = mysqlConnector(config.connectors["default"]);

//entities
import { DataTypes } from "./dataTypes"
import { IEntity } from "./Entities/IEntity"

import { IUserAttributes, GetUserModel } from "./Entities/Users/User"
import { IGroupAttributes, GetGroupModel } from "./Entities/Users/Group"
import { IPermissionAttributes, GetPermissionModel } from "./Entities/Users/Permission"

import { IMemberAttributes, GetMemberModel } from "./Entities/Members/Member"
import { IMemberMetaAttributes, GetMemberMetaModel } from "./Entities/Members/MemberMeta"

import { ICategoryAttributes, GetCategoryModel } from "./Entities/Activities/Category"
import { IActivityAttributes, GetActivityModel} from "./Entities/Activities/Activity"
import { ISectionAttributes, GetSectionModel } from "./Entities/Activities/Section"
import { ISessionAttributes, GetSessionModel} from "./Entities/Activities/Session"
import { IPlaceAttributes, GetPlaceModel} from "./Entities/Activities/Place"

import { ICampaignAttributes, GetCampaignModel} from "./Entities/Global/Campaign"

export interface IModels {
    [key: string]: IEntity<any>

    Campaign?: IEntity<ICampaignAttributes>

    User?: IEntity<IUserAttributes>
    Group?: IEntity<IGroupAttributes>
    Permission?: IEntity<IPermissionAttributes>

    Member?: IEntity<IMemberAttributes>
    MemberMeta?: IEntity<IMemberMetaAttributes>

    Category?: IEntity<ICategoryAttributes>
    Activity?: IEntity<IActivityAttributes>
    Section?: IEntity<ISectionAttributes>
    Session?: IEntity<ISessionAttributes>
    Place?: IEntity<IPlaceAttributes>
}

//création des entities
let __models: IModels = {};
__models.Campaign = GetCampaignModel(connector, new DataTypes());
__models.User = GetUserModel(connector, new DataTypes());
__models.Group = GetGroupModel(connector, new DataTypes());
__models.Permission = GetPermissionModel(connector, new DataTypes());
__models.Member = GetMemberModel(connector, new DataTypes());
__models.MemberMeta = GetMemberMetaModel(connector, new DataTypes());
__models.Category = GetCategoryModel(connector, new DataTypes());
__models.Activity = GetActivityModel(connector, new DataTypes());
__models.Section = GetSectionModel(connector, new DataTypes());
__models.Session = GetSessionModel(connector, new DataTypes());
__models.Place = GetPlaceModel(connector, new DataTypes());

//association des entities
for(let key in __models){
    if(__models[key].associate) __models[key].associate(__models);
}

export const Models = __models;