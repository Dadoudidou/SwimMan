import * as ApiModels from "modules/api/models";
import * as moment from "moment";


var BreakException = {};

export const getCategory = (tree: ApiModels.CategoryTree[], category_id?: number): ApiModels.Category => {
    let _retour: ApiModels.Category;
    try {
        tree.forEach((category, index) => {
            if (category_id != undefined) {
                if (category.id == category_id) {
                    _retour = new ApiModels.Category({
                        id: category.id,
                        name: category.name
                    })
                    throw BreakException;
                }
            } else {
                _retour = new ApiModels.Category({
                    id: category.id,
                    name: category.name
                })
                throw BreakException;
            }
        })
    } catch (e) {
        if (e !== BreakException) throw e;
    }
    return _retour;
};

export const getActivity = (tree: ApiModels.CategoryTree[], activity_id?: number): ApiModels.Activity => {
    let _retour: ApiModels.Activity;
    try {
        tree.forEach(category => {
            category.activities.forEach(activity => {
                if (activity_id != undefined) {
                    if (activity.id == activity_id) {
                        _retour = new ApiModels.Activity({
                            id: activity.id,
                            name: activity.name,
                            category: new ApiModels.Category({
                                id: category.id,
                                name: category.name
                            })
                        })
                        throw BreakException;
                    }
                } else {
                    _retour = new ApiModels.Activity({
                        id: activity.id,
                        name: activity.name,
                        category: new ApiModels.Category({
                            id: category.id,
                            name: category.name
                        })
                    })
                    throw BreakException;
                }
            });
        })
    } catch (e) {
        if (e !== BreakException) throw e;
    }
    return _retour;
};

export const getSection = (tree: ApiModels.CategoryTree[], section_id?: number): ApiModels.Section => {
    let _retour: ApiModels.Section;
    try {
        tree.forEach(category => {
            category.activities.forEach(activity => {
                activity.sections.forEach(section => {
                    if (section_id !== undefined) {
                        if (section.id == section_id) {
                            _retour = new ApiModels.Section({
                                id: section.id,
                                name: section.name,
                                activity: new ApiModels.Activity({
                                    id: activity.id,
                                    name: activity.name,
                                    category: new ApiModels.Category({
                                        id: category.id,
                                        name: category.name
                                    })
                                })
                            })
                            throw BreakException;
                        }
                    } else {
                        _retour = new ApiModels.Section({
                            id: section.id,
                            name: section.name,
                            activity: new ApiModels.Activity({
                                id: activity.id,
                                name: activity.name,
                                category: new ApiModels.Category({
                                    id: category.id,
                                    name: category.name
                                })
                            })
                        })
                        throw BreakException;
                    }
                })
            });
        })
    } catch (e) {
        if (e !== BreakException) throw e;
    }
    return _retour;
};