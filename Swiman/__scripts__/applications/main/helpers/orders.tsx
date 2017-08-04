import * as ApiModels from "modules/api/models";
import * as React from "react";
import * as moment from "moment";

interface IOrderToNodeProps {
    order: ApiModels.Order
    hideAmount?: boolean
    hideSessions?: boolean
    hidePeriodicity?: boolean
    inline?: boolean
}
export class OrderToNode extends React.PureComponent<IOrderToNodeProps, any>
{
    render()
    {
        let order = this.props.order;
        return (
            <span>
                {
                    (!this.props.hideAmount) ?
                        <span>
                            {order.amount} €
                            {!this.props.inline ? <br /> : <span> - </span>}
                        </span>
                        : undefined
                }
                {
                    (!this.props.hideSessions) ?
                        <span>
                            {
                                (order.is_card) ?
                                    <span>Carte de {order.card_nb_session} session{(order.card_nb_session > 1) ? "s" : ""}</span>
                                    :
                                    (order.restriction_session_min == undefined || order.restriction_session_max == undefined) ?
                                        <span>Toutes sessions</span>
                                        :
                                        (order.restriction_session_max == order.restriction_session_min) ?
                                            <span>{order.restriction_session_min} session{(order.restriction_session_min > 1) ? "s" : ""}</span>
                                            :
                                            <span>{order.restriction_session_min} à {order.restriction_session_max} sessions</span>
                            }
                            {!this.props.inline ? <br /> : <span> - </span>}
                        </span>
                        : undefined
                }
                {
                    (!this.props.hidePeriodicity) ?
                        <span>
                            du {moment(order.date_from).format("LL")} au {moment(order.date_to).format("LL")}
                        </span>
                        : undefined
                }
            </span>
        );
    }
}

export const OrderToString = (order: ApiModels.Order): string => {
    let ret = [];

    ret.push(order.amount + " €");

    if (order.is_card) {
        ret.push("Carte de " + order.card_nb_session + " session" + (order.card_nb_session > 1 ? "s" : ""));
    } else {
        if (order.restriction_session_max == undefined || order.restriction_session_min == undefined) {
            ret.push("Toutes sessions");
        } else {
            if (order.restriction_session_max == order.restriction_session_min) {
                ret.push(order.restriction_session_min + " session" + (order.restriction_session_min > 1 ? "s" : ""));
            } else {
                ret.push("de " + order.restriction_session_min + " à " + order.restriction_session_max + " sessions");
            }
        }
    }

    ret.push("du " + moment(order.date_from).format("LL") + " au " + moment(order.date_to).format("LL"));

    return ret.join(" - ");
}
