using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace Layer_datas.Services
{
    public class Members : IService
    {
        private Context.ModelContext _ctx;

        public Members(Context.ModelContext ctx)
        {
            _ctx = ctx;
        }

        public void SetMaps(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<Entities.members.Member, Objects.members.Member>();
            cfg.CreateMap<Entities.members.Meta, Objects.members.MemberMeta>();

            cfg.CreateMap<Objects.members.Member, Entities.members.Member>();
            cfg.CreateMap<Objects.members.MemberMeta, Entities.members.Meta>();
        }


        #region MEMBERS

        public Objects.members.Member AddMember(Objects.members.Member item)
        {
            item.id = 0;
            var _entity = Mapper.Map<Entities.members.Member>(item);
            _entity = _ctx.members.Add(_entity);
            _ctx.SaveChanges();
            return Mapper.Map<Objects.members.Member>(_entity);
        }

        public Objects.members.Member UpdateMember(Objects.members.Member item)
        {
            var _entity = _ctx.members.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Member not exist");

            //request all attributes
            _entity.metas.ToList();

            var __entity = Mapper.Map(item, _entity);
            _ctx.Entry(__entity).State = System.Data.Entity.EntityState.Modified;
            _ctx.SaveChanges();
            return Mapper.Map<Objects.members.Member>(__entity);
        }

        public void DeleteMember(Objects.members.Member item)
        {
            var _entity = _ctx.members.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Member not exist");
            _ctx.members.Remove(_entity);
            _ctx.SaveChanges();
        }

        public class SearchCriteriaMember
        {
            public string last_name { get; set; }
            public string first_name { get; set; }
            public string licence { get; set; }
            public string city { get; set; }
        }

        private IQueryable<Entities.members.Member> SearchRequest(SearchCriteriaMember criteria)
        {
            var query = _ctx.members.Where(x => true);
            if (criteria.last_name != null)
            {
                query = query.Where(x => x.last_name.ToUpper().Contains(criteria.last_name.ToUpper()));
            }
            if (criteria.first_name != null)
            {
                query = query.Where(x => x.first_name.ToUpper().Contains(criteria.first_name.ToUpper()));
            }
            if (criteria.licence != null)
            {
                query = query.Where(x => (x.metas.FirstOrDefault(y => y.col_key == "licence") != null) ? 
                x.metas.FirstOrDefault(y => y.col_key == "licence").col_value.Contains(criteria.licence) : 
                false);
            }
            if (criteria.city != null)
            {
                query = query.Where(x => x.city.ToUpper().Contains(criteria.city.ToUpper()));
            }
            return query;
        }

        public int SearchCount(SearchCriteriaMember criteria)
        {
            var query = SearchRequest(criteria);
            return query.Count();
        }
        public List<Objects.members.Member> Search(SearchCriteriaMember criteria, int limit = 10, int page = 1)
        {
            var query = SearchRequest(criteria);

            query = query.OrderBy(x => x.last_name).ThenBy(x => x.first_name);
            query = query.Skip( ((page < 0 ? 0 : page) - 1) * limit);
            query = query.Take(limit);

            return Mapper.Map<List<Objects.members.Member>>(query.ToList());
        }

        public Objects.members.Member GetMemberById(int id)
        {
            return Mapper.Map<Objects.members.Member>(_ctx.members.FirstOrDefault(x => x.id == id));
        }

        #endregion
    }
}
