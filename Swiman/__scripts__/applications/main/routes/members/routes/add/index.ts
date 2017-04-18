import List from "./Add";

export const loadRoutes = (store) => {
    return {
        path: 'add(/:id)',
        component: List
    }
}