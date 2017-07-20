import * as ApiModels from "modules/api/models";
import * as React from "react";

export const getMeta = (member: ApiModels.Member, col_key: string, defaut?: React.ReactNode): React.ReactNode => {
    if (!member || !member.metas) return undefined;
    let _index = member.metas.map(x => x.col_key.toLowerCase()).indexOf(col_key.toLowerCase());
    if (_index > -1 && member.metas[_index].col_value && member.metas[_index].col_value.trim() != "") {
        return member.metas[_index].col_value;
    } else {
        return defaut;
    }
}