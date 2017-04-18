using Layer_datas;
using Layer_datas.Services.Objects.members;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Swiman.Areas.API.Controllers
{
    public class MembersController : AppController
    {
        [HttpPost]
        public JsonResult AddMember(Member member)
        {
            using (var ctx = new UnitOfWork())
            {
                Member _member = ctx.members.AddMember(member);
                return Json(_member);
            }
        }

        [HttpPost]
        public JsonResult UpdateMember(Member member)
        {
            using (var ctx = new UnitOfWork())
            {
                Member _member = ctx.members.UpdateMember(member);
                return Json(_member);
            }
        }

        [HttpPost]
        public JsonResult Search(Layer_datas.Services.Members.SearchCriteriaMember criteria, int limit = 10)
        {
            using (var ctx = new UnitOfWork())
            {
                List<Member> _members = ctx.members.Search(criteria, limit);
                return Json(_members);
            }
        }

        [HttpPost]
        public JsonResult GetMemberById(int id)
        {
            using (var ctx = new UnitOfWork())
            {
                Member _member = ctx.members.GetMemberById(id);
                return Json(_member);
            }
        }

    }
}