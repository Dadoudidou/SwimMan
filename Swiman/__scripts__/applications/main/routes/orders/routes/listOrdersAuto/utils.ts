import * as ApiModels from "modules/api/models";
import * as moment from "moment";

export const orderToStringAction = (order: ApiModels.OrderAuto): string => {
    let _string = "";

    let _restrictions: string[] = [];
    let _amount = "";
    let _apply = "";

    //AMOUNT
    if (order.action_amount)
        _amount = ((order.action_amount > 0) ? "+" + order.action_amount : order.action_amount) + "€";
    else if (order.action_amount_pourcent)
        _amount = ((order.action_amount_pourcent > 0) ? "+" + order.action_amount_pourcent : order.action_amount_pourcent) + "%";

    //APPLY ON
    if (order.apply_on_member) {
        if (order.restriction_member_nb) {
            _apply = "pour " +
                ((order.restriction_member_nb_operator != "==") ? order.restriction_member_nb_operator : "") +
                " " +
                order.restriction_member_nb + "ème adhérent(s)";
        } else {
            _apply = "pour les adhérents"
        }
    } else if (order.apply_on_adhesion) {
        _apply = "sur l'adhésion pour les adhérents"
    }

    //RESTRICTIONS
    if (order.restriction_age) {
        _restrictions.push("dont l'âge est " + order.restriction_age_operator + " " + order.restriction_age);
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
            ((order.restriction_adhesion_nb_operator != "==") ? order.restriction_adhesion_nb_operator : "") +
            " " +
            order.restriction_adhesion_nb +
            " adhésions")
    }


    return _amount + " " + _apply + " " + _restrictions.join(", ");
}