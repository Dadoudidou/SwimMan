using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace System.Web.Mvc
{
    public class JsonNetResult : JsonResult
    {
        public JsonSerializerSettings jsonSettings { get; set; }

        public override void ExecuteResult(ControllerContext context)
        {
            HttpResponseBase response = context.HttpContext.Response;
            response.ContentType = "application/json";

            if (ContentEncoding != null)
            {
                response.ContentEncoding = ContentEncoding;
            }

            if (Data != null)
            {
                if (jsonSettings == null) jsonSettings = new JsonSerializerSettings();
                response.Write(JsonConvert.SerializeObject(Data, jsonSettings));
            }
        }
    }
}