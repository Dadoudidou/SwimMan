using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Swiman.Areas.API.Controllers
{
    public abstract class AppController : Controller
    {
        protected override JsonResult Json(object data, string contentType, Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonNetResult()
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior,
                jsonSettings = new Newtonsoft.Json.JsonSerializerSettings
                {
                    Converters = new List<Newtonsoft.Json.JsonConverter>(){
                        //new Newtonsoft.Json.Converters.StringEnumConverter(),
                        new Newtonsoft.Json.Converters.IsoDateTimeConverter()
                    },
                    NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
                    DefaultValueHandling = Newtonsoft.Json.DefaultValueHandling.Ignore
                }
            };
        }
    }
}