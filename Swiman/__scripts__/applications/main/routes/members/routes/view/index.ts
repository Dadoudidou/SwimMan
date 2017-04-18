import Comp from "./View";

export const loadRoutes = (store) => {
    return {
        path: ':id',
        component: Comp
    }
}