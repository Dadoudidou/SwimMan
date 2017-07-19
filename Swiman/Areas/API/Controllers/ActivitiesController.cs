using Layer_datas;
using Layer_datas.Services.Objects;
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
        #region ACTIVITIES

        [HttpPost]
        public JsonResult GetCategories(Season season)
        {

            using (var ctx = new UnitOfWork())
            {
                List<Category> items = ctx.activities.GetsCategories(season);
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

        [HttpPost]
        public JsonResult UpdateCategory(Category category)
        {
            using (var ctx = new UnitOfWork())
            {
                Category retour = null;
                if (category.id == 0)
                    retour = ctx.activities.AddCategory(category, category.season);
                else
                    retour = ctx.activities.UpdateCategory(category);
                return Json(retour);
            }
        }

        [HttpPost]
        public JsonResult UpdateActivity(Activity activity)
        {
            using (var ctx = new UnitOfWork())
            {
                Activity retour = null;
                if (activity.id == 0)
                    retour = ctx.activities.AddActivity(activity);
                else
                    retour = ctx.activities.UpdateActivity(activity);
                return Json(retour);
            }
        }

        [HttpPost]
        public JsonResult UpdateSection(Section section)
        {
            using (var ctx = new UnitOfWork())
            {
                Section retour = null;
                if (section.id == 0)
                    retour = ctx.activities.AddSection(section);
                else
                    retour = ctx.activities.UpdateSection(section);
                return Json(retour);
            }
        }


        [HttpPost]
        public JsonResult GetTree(Season season)
        {
            using (var ctx = new UnitOfWork())
            {
                List<CategoryTree> items = ctx.activities.GetsCategoriesTree(season);
                return Json(items);
            }
        }

        #endregion

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

        #region SESSIONS

        public class GetSessionsProps
        {
            public Season season { get; set; }
            public Section section { get; set; }
            public Place place { get; set; }
        }
        [HttpPost]
        public JsonResult GetSessions(GetSessionsProps props)
        {
            using (var ctx = new UnitOfWork())
            {
                var sessions = ctx.activities.GetsSessions(props.section, props.place, props.season);
                return Json(sessions);
            }
        }
        [HttpPost]
        public JsonResult UpdateSession(Session session)
        {
            using (var ctx = new UnitOfWork())
            {
                Session retour = null;
                if(session.id == 0)
                    retour = ctx.activities.AddSession(session);
                else
                    retour = ctx.activities.UpdateSession(session);
                return Json(retour);
            }
        }

        #endregion
    }
}