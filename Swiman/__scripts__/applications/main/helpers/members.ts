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

export const setMeta = (member: ApiModels.Member, col_key: string, col_value: string): ApiModels.Member => {
    let _index = member.metas.map(x => x.col_key.toLowerCase()).indexOf(col_key.toLowerCase());
    let _member = { ...member };
    if (!_member.metas) _member.metas = [];
    if (_index > -1) {
        return {
            ...member,
            metas: member.metas.map((meta, index) => {
                if (index == _index) {
                    return {
                        ...meta,
                        col_value: col_value
                    }
                }
                return meta;
            })
        };
    } else {
        return {
            ...member,
            metas: [
                ...member.metas,
                { col_key: col_key, col_value: col_value }
            ]
        };
    }
}