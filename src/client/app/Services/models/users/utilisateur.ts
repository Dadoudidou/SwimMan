import * as assign from "object-assign"
import { Droit } from "./droit"

export class Utilisateur
{
    last_name: string
    first_name: string

    droits: number[]

    constructor(init?: Partial<Utilisateur>){
        if(init) assign(this, init);
    }
}