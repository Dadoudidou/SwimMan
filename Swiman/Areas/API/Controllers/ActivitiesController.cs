using Layer_datas;
using Layer_datas.Services.Objects.activities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Swiman.Areas.API.Controllers
{
    public class ActivitiesController : AppController
    {
        [HttpPost]
        public JsonResult GetCategories()
        {

            using (var ctx = new UnitOfWork())
            {
                List<Category> items = ctx.activities.GetsCategories();
                return Json(items);
            }
        }

        [HttpPost]
        public JsonResult GetActivities(Category category)
        {

            using (var ctx = new UnitOfWork())
            {
                List<Activity> items = ctx.activities.GetsActivities(category);
                return Json(items);
            }
        }

        [HttpPost]
        public JsonResult GetSections(Activity activity)
        {

            using (var ctx = new UnitOfWork())
            {
                List<Section> items = ctx.activities.GetsSections(activity);
                return Json(items);
            }
        }


        #region PLACES

        [HttpPost]
        public JsonResult AddPlace(Place place)
        {
            using (var ctx = new UnitOfWork())
            {
                return Json(ctx.activities.AddPlace(place));
            }
        }

        [HttpPost]
        public JsonResult UpdatePlace(Place place)
        {
            using (var ctx = new UnitOfWork())
            {
                return Json(ctx.activities.UpdatePlace(place));
            }
        }

        [HttpPost]
        public JsonResult DeletePlace(Place place)
        {
            using (var ctx = new UnitOfWork())
            {
                ctx.activities.DeletePlace(place);
                return Json(true);
            }
        }

        [HttpPost]
        public JsonResult GetPlaceById(int id)
        {
            using (var ctx= new UnitOfWork())
            {
                return Json(ctx.activities.GetPlaceById(id));
            }
        }

        [HttpPost]
        public JsonResult GetPlaces()
        {
            using (var ctx = new UnitOfWork())
            {
                return Json(ctx.activities.GetsPlaces());
            }
        }

        #endregion
    }
}