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
            cfg.CreateMap<Entities.members.Adhesion, Objects.members.Adhesion>();

            cfg.CreateMap<Objects.members.Member, Entities.members.Member>();
            cfg.CreateMap<Objects.members.MemberMeta, Entities.members.Meta>();
            cfg.CreateMap<Objects.members.Adhesion, Entities.members.Adhesion>();
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

        #region ADHESIONS

        public class SearchCriteriaAdhesion
        {
            public Objects.members.Member member { get; set; }
            public Objects.Season season { get; set; }
            public Objects.activities.Category category { get; set; }
            public Objects.activities.Activity activity { get; set; }
            public Objects.activities.Section section { get; set; }
            public Objects.activities.Place place { get; set; }
        }

        private IQueryable<Entities.members.Adhesion> SearchRequestAdhesion(SearchCriteriaAdhesion criteria)
        {
            var query = _ctx.members_adhesions.Where(x => true);

            if (criteria.member != null)
                query = query.Where(x => x.member_id == criteria.member.id);
            if (criteria.category != null)
                query = query.Where(x => x.section != null && x.section.activity.category_id == criteria.category.id);
            if(criteria.activity != null)
                query = query.Where(x => x.section != null && x.section.activity_id == criteria.activity.id);
            if(criteria.section != null)
                query = query.Where(x => x.section != null && x.section_id == criteria.section.id);
            if(criteria.season != null)
                query = query.Where(x => x.section != null && x.section.activity.category.season_id == criteria.season.id);

            return query;
        }
        public int SearchCountAdhesions(SearchCriteriaAdhesion criteria)
        {
            var query = SearchRequestAdhesion(criteria);
            return query.Count();
        }
        public List<Objects.members.Adhesion> SearchAdhesions(SearchCriteriaAdhesion criteria, int limit = 10, int page = 1)
        {
            var query = SearchRequestAdhesion(criteria);

            query = query.OrderByDescending(x => x.created);
            query = query.Skip(((page < 0 ? 0 : page) - 1) * limit);
            query = query.Take(limit);

            return Mapper.Map<List<Objects.members.Adhesion>>(query.ToList());
        }

        public Objects.members.Adhesion AddAdhesion(Objects.members.Adhesion item)
        {
            item.id = 0;

            //recherche order
            if (item.order == null) throw new ArgumentNullException("Order");
            var _order = _ctx.orders.FirstOrDefault(x => x.id == item.order.id);
            if (_order == null) throw new ArgumentException("Order not exist");

            //recherche member
            if (item.member == null) throw new ArgumentNullException("Member");
            var _member = _ctx.members.FirstOrDefault(x => x.id == item.member.id);
            if (_member == null) throw new ArgumentException("Member not exist");

            //recherche section [facultatif]
            Entities.activities.Section _section = null;
            if (item.section != null)
            {
                _section = _ctx.activities_sections.FirstOrDefault(x => x.id == item.section.id);
                if (_section == null) throw new ArgumentException("Section not exist");
            }

            var _entity = Mapper.Map<Entities.members.Adhesion>(item);
            _entity.order = _order;
            _entity.order_id = _order.id;
            _entity.member = _member;
            _entity.member_id = _member.id;
            _entity.section = _section;
            _entity.section_id = (_section != null) ? (int?)_section.id : null;

            _entity = _ctx.members_adhesions.Add(_entity);
            _ctx.SaveChanges();
            return Mapper.Map<Objects.members.Adhesion>(_entity);
        }

        public Objects.members.Adhesion UpdateAdhesion(Objects.members.Adhesion item)
        {
            var _entity = _ctx.members_adhesions.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Adhesion not exist");

            //recherche order
            if (item.order == null) throw new ArgumentNullException("Order");
            var _order = _ctx.orders.FirstOrDefault(x => x.id == item.order.id);
            if (_order == null) throw new ArgumentException("Order not exist");

            //recherche member
            if (item.member == null) throw new ArgumentNullException("Member");
            var _member = _ctx.members.FirstOrDefault(x => x.id == item.member.id);
            if (_member == null) throw new ArgumentException("Member not exist");

            //recherche section [facultatif]
            Entities.activities.Section _section = null;
            if (item.section != null)
            {
                _section = _ctx.activities_sections.FirstOrDefault(x => x.id == item.section.id);
                if (_section == null) throw new ArgumentException("Section not exist");
            }

            var __entity = Mapper.Map(item, _entity);
            __entity.order = _order;
            __entity.order_id = _order.id;
            __entity.member = _member;
            __entity.member_id = _member.id;
            __entity.section = _section;
            __entity.section_id = (_section != null) ? (int?)_section.id : null;

            _ctx.Entry(__entity).State = System.Data.Entity.EntityState.Modified;
            _ctx.SaveChanges();

            return Mapper.Map<Objects.members.Adhesion>(__entity);
        }

        public Objects.members.Adhesion GetAdhesionById(int id)
        {
            return Mapper.Map<Objects.members.Adhesion>(_ctx.members_adhesions.FirstOrDefault(x => x.id == id));
        }

        #endregion
    }
}
