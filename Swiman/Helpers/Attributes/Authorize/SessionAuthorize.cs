using Layer_datas.Services.Objects.users;
using Swiman;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace System.Web.Mvc
{
    public class SessionAuthorize : AuthorizeAttribute
    {
        public enum LogicOperation {
            AND, OR
        }

        private int[] _permissions;
        private LogicOperation _logical;
        public SessionAuthorize(int[] permissions, LogicOperation logical = LogicOperation.OR)
            :base()
        {
            _permissions = permissions;
            _logical = logical;
        }
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if (httpContext == null) return false;

            var user = ((User)(httpContext.Session[GlobalVar.SESSION_USER_CONNECTED] ?? null));
            if (user == null) return false;

            //permissions
            bool auth = false;

            if (_logical == LogicOperation.OR)
            {
                int i = 0;
                while (auth == false && i < _permissions.Length)
                {
                    if (user.permissions.Contains(_permissions[i])) auth = true;
                    i++;
                }
            } else if(_logical == LogicOperation.AND)
            {
                auth = true;
                int i = 0;
                while (auth == true && i < _permissions.Length)
                {
                    if (!user.permissions.Contains(_permissions[i])) auth = false;
                    i++;
                }
            }

            if (!auth) return false;
            return true;
            //return base.AuthorizeCore(httpContext);
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            //JSON CALL
            if (filterContext.HttpContext.Request.AcceptTypes.Contains("application/json") ||
                    filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
            {
                filterContext.Result = new Http403Result();
            }
            base.HandleUnauthorizedRequest(filterContext);
        }
    }
}