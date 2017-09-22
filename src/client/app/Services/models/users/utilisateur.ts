import * as assign from "object-assign"
import { Droit } from "./droit"

export class Utilisateur
{
    nom: string
    prenom: string

    droits: number[]

    constructor(init?: Partial<Utilisateur>){
        if(init) assign(this, init);
    }
}