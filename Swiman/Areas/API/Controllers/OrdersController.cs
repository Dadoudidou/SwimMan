using Layer_datas;
using Layer_datas.Services.Objects;
using Layer_datas.Services.Objects.orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Swiman.Areas.API.Controllers
{
    public class OrdersController : AppController
    {
        private class SearchResult
        {
            public List<Order> orders { get; set; }
            public int count { get; set; }
            public int page { get; set; }
        }
        [HttpPost]
        public JsonResult Search(Layer_datas.Services.Orders.SearchCriteriaOrder criteria, int limit = 10, int page = 1)
        {
            using (var ctx = new UnitOfWork())
            {
                //nombre de résultats
                int _count = ctx.orders.SearchCount(criteria);
                limit = limit < 1 ? 1 : limit;
                page = page < 1 ? 1 : page;
                //si la page demandée est supérieure aux nombres de résultats, on prend la dernière page qui retournera des résultats
                if ((page - 1) * limit > (_count - 1))
                {
                    page = _count / limit + 1;
                }
                //récupération des résultats
                List<Order> _orders = ctx.orders.Search(criteria, limit, page);

                return Json(new SearchResult()
                {
                    orders = _orders,
                    count = _count,
                    page = page
                });
            }
        }

        [HttpPost]
        public JsonResult UpdateOrder(Order order)
        {
            using (var ctx = new UnitOfWork())
            {
                Order retour = null;
                if (order.id == 0)
                    retour = ctx.orders.AddOrder(order);
                else
                    retour = ctx.orders.UpdateOrder(order);
                return Json(retour);
            }
        }


        private class SearchOrdersAutoResult
        {
            public List<OrderAuto> ordersAuto { get; set; }
            public int count { get; set; }
            public int page { get; set; }
        }
        [HttpPost]
        public JsonResult SearchOrdersAuto(Layer_datas.Services.Orders.SearchCriteriaOrderAuto criteria, int limit = 10, int page = 1)
        {
            using (var ctx = new UnitOfWork())
            {
                //nombre de résultats
                int _count = ctx.orders.SearchCountOrdersAuto(criteria);
                limit = limit < 1 ? 1 : limit;
                page = page < 1 ? 1 : page;
                //si la page demandée est supérieure aux nombres de résultats, on prend la dernière page qui retournera des résultats
                if ((page - 1) * limit > (_count - 1))
                {
                    page = _count / limit + 1;
                }
                //récupération des résultats
                List<OrderAuto> _orders = ctx.orders.SearchOrdersAuto(criteria, limit, page);

                return Json(new SearchOrdersAutoResult()
                {
                    ordersAuto = _orders,
                    count = _count,
                    page = page
                });
            }
        }
    }
}