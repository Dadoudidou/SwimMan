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

        private class SearchResult
        {
            public List<Member> members { get; set; }
            public int count { get; set; }
            public int page { get; set; }
        }
        [HttpPost]
        public JsonResult Search(Layer_datas.Services.Members.SearchCriteriaMember criteria, int limit = 10, int page = 1)
        {
            using (var ctx = new UnitOfWork())
            {
                //nombre de résultats
                int _count = ctx.members.SearchCount(criteria);
                limit = limit < 1 ? 1 : limit;
                page = page < 1 ? 1 : page;
                //si la page demandée est supérieure aux nombres de résultats, on prend la dernière page qui retournera des résultats
                if(( page - 1 ) * limit > (_count - 1))
                {
                    page = _count / limit + 1;
                }
                //récupération des résultats
                List<Member> _members = ctx.members.Search(criteria, limit, page);
                
                return Json(new SearchResult() {
                    members = _members,
                    count = _count,
                    page = page
                });
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