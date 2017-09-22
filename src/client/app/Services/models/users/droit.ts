import * as assign from "object-assign"

export class Droit
{
    id: number
    libelle: string
    description: string

    constructor(init?: Partial<Droit>){
        if(init) assign(this, init);
    }
}