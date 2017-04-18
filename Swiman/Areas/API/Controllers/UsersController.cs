using Layer_datas;
using Layer_datas.Services.Objects.users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Swiman.Areas.API.Controllers
{
    public class UsersController : AppController
    {
        // GET: API/Users
        public JsonResult Login(string username, string password)
        {

            var profil = new User();
            if (username != "dadou" || password != "dadou")
                throw new Exception("Nom d'utilisateur ou mot de passe invalide");


            using(var _ctx = new UnitOfWork())
            {
                profil = _ctx.users.LoginUser(username, password);
                if(profil == null)
                {
                    throw new Exception("Not authorized");
                }
            }

            //profil.id = 1;
            //profil.username = username;
            //profil.permissions = new List<int>() { 1, 2, 3, 4, 5, 6, 7, 8, 9 };

            //création du cookie
            var authTicket = new FormsAuthenticationTicket(username + ":" + password, true, 2880);
            HttpCookie authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, FormsAuthentication.Encrypt(authTicket));
            HttpContext.Session["connected"] = true;
            HttpContext.Session[GlobalVar.SESSION_USER_CONNECTED] = profil;
            if (authTicket.IsPersistent) { authCookie.Expires = authTicket.Expiration; }
            Response.Cookies.Add(authCookie);

            return Json(profil);
        }
    }
}