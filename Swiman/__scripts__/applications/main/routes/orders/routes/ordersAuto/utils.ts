import * as ApiModels from "modules/api/models";
import * as moment from "moment";

export const orderToStringAction = (order: ApiModels.OrderAuto): string => {
    let _string = "";

    function operatorToString(operator: string, content: string) {
        let _text = "";
        switch (operator) {
            case "==":
                _text = content;
                break;
            case ">":
                _text = "plus de " + content;
                break;
            case "<":
                _text = "moins de " + content;
                break;
            case ">=":
                _text = content + " et plus";
                break;
            case "<=":
                _text = content + " et moins";
                break;
            case "!=":
                _text = "différent de " + content;
                break;
        }
        return _text;
    }

    let _restrictions: string[] = [];
    let _amount = "";
    let _apply = "";

    //AMOUNT
    if (order.action_amount != undefined)
        _amount = ((order.action_amount >= 0) ? "+" + order.action_amount : order.action_amount) + "€";
    else if (order.action_amount_pourcent != undefined)
        _amount = ((order.action_amount_pourcent >= 0) ? "+" + order.action_amount_pourcent : order.action_amount_pourcent) + "%";


    //APPLY ON
    //if (order.apply_on_member) {
        if (order.restriction_member_nb) {

            let _memberText = "";
            if (order.restriction_member_nb_operator == "==") {
                let _enieme = "ème"; if (order.restriction_member_nb == 1) _enieme = "er";
                _memberText = "le " + order.restriction_member_nb + _enieme + " adhérent";
            } else {
                _memberText = order.restriction_member_nb + " adhérent" + (order.restriction_member_nb > 1 ? "s" : "");
            }

            _apply = "pour " + operatorToString(order.restriction_member_nb_operator, _memberText);
        } else {
            _apply = "pour les adhérents"
        }
    //}

    if (order.apply_on_adhesion) {
        _apply = "sur l'adhésion " + _apply;
    }

    //RESTRICTIONS
    if (order.restriction_age) {
        _restrictions.push("ayant " + operatorToString(order.restriction_age_operator, order.restriction_age + " ans"));
    }
    if (order.restriction_category) {
        _restrictions.push("appartenant au groupe " + order.restriction_category.name)
    }
    if (order.restriction_activity) {
        _restrictions.push("appartenant au groupe " + order.restriction_activity.category.name + " / " + order.restriction_activity.name)
    }
    if (order.restriction_section) {
        _restrictions.push("appartenant au groupe " + order.restriction_section.activity.category.name + " / " + order.restriction_section.activity.name + " / " + order.restriction_section.name)
    }
    if (order.restriction_adhesion_nb) {
        _restrictions.push(
            "ayant " +
            operatorToString(order.restriction_adhesion_nb_operator, order.restriction_adhesion_nb + " adhesion" + (order.restriction_adhesion_nb > 1 ? "s" : "")))
    }


    return _amount + " " + _apply + " " + _restrictions.join(", ");
}

export function TryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}

export function TryParseFloat(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseFloat(str);
            }
        }
    }
    return retValue;
}

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