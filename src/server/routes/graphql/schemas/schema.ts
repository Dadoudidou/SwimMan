import { GraphQlContext } from "routes/graphql";
import { ICampaignAttributes } from "datas-layer/Entities/Global/Campaign";
import { ICategoryAttributes } from "datas-layer/Entities/Activities/Category";

type schemaResolver<T> = (root?: T, args?: any, context?: GraphQlContext) => any

export type schema<T> = {

    /** Définition des types */
    typeDefs: string

    /** Définition des requêtes */
    queryDefs?: string

    /** Définition des mutations (changements, ADD, UPDATE, DELETE) */
    mutationDefs?: string

    /** Résolution des types */
    typeResolvers?: { 
        [key:string]: { [key:string]: schemaResolver<T> }
    }

    /** Résolution des requêtes */
    queryResolvers?: {
        [key:string]: schemaResolver<any>
    }

    /** Résolution des mutations */
    mutationResolvers?: {
        [key:string]: schemaResolver<any>
    }

}

export class schemaGroup {
    _schemas: schema<any>[]
    constructor(schemas: schema<any>[]){
        this._schemas = schemas;
    }

    private getDefs = (def: "typeDefs" | "queryDefs" | "mutationDefs"): string => {
        let _defs = "";
        this._schemas.forEach(schema => {
            if(schema[def]) _defs += schema[def];
        })
        return _defs;
    }
    private getResolvers = (def: "typeResolvers" | "queryResolvers" | "mutationResolvers"): {[key:string]: schemaResolver<any>} => {
        let _defs = {};
        this._schemas.forEach(schema => {
            if(schema[def]) _defs = { ..._defs, ...schema[def] };
        })
        return _defs;
    }
    getTypeDefs = (): string => {
        return this.getDefs("typeDefs");
    }
    getQueryDefs = (): string => {
        return this.getDefs("queryDefs");
    }
    getMutationDefs = (): string => {
        return this.getDefs("mutationDefs");
    }
    getTypeResolvers = (): {[key:string]: schemaResolver<any>} => {
        return this.getResolvers("typeResolvers");
    }
    getQueryResolvers = (): {[key:string]: schemaResolver<any>} => {
        return this.getResolvers("queryResolvers");
    }
    getMutationResolvers = (): {[key:string]: schemaResolver<any>} => {
        return this.getResolvers("mutationResolvers");
    }
}


