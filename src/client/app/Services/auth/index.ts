export { authorize, testDroits } from "./authorize"
export { IWithDroitsOptions, withDroits } from "./withDroits"

export const haveDroit = (droits: number[], droit: number) => {
    return droits.indexOf(droit) > -1;
}