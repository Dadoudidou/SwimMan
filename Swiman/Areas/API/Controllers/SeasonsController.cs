using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Layer_datas.Services.Objects;
using Layer_datas;

namespace Swiman.Areas.API.Controllers
{
    public class SeasonsController : AppController
    {
        [HttpPost]
        public JsonResult Add(Season season)
        {
            using (var ctx = new UnitOfWork())
            {
                Season _season = ctx.seasons.Add(season);
                return Json(_season, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult Update(Season season)
        {
            using (var ctx = new UnitOfWork())
            {
                Season _season = ctx.seasons.Update(season);
                return Json(_season, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult Gets(DateTime? start = null, DateTime? end = null)
        {

            using (var ctx = new UnitOfWork())
            {
                List<Season> seasons = ctx.seasons.Gets(
                    (start == null) ? default(DateTime) : (DateTime)start, 
                    (end == null) ? default(DateTime) : (DateTime)end
                );
                return Json(seasons, JsonRequestBehavior.AllowGet);
            }
        }
    }
}