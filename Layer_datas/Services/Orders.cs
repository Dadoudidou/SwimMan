using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Services
{
    public class Orders : IService
    {
        private Context.ModelContext _ctx;

        public Orders(Context.ModelContext ctx)
        {
            _ctx = ctx;
        }

        public void SetMaps(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<Entities.orders.Order, Objects.orders.Order>();
            cfg.CreateMap<Entities.orders.OrderAuto, Objects.orders.OrderAuto>();

            cfg.CreateMap<Objects.orders.Order, Entities.orders.Order>();
            cfg.CreateMap<Objects.orders.OrderAuto, Entities.orders.OrderAuto>();
        }

        #region SEARCH ORDER

        public class SearchCriteriaOrder
        {
            public int season_id { get; set; }
        }

        private IQueryable<Entities.orders.Order> SearchRequest(SearchCriteriaOrder criteria)
        {
            var query = _ctx.orders.Where(x => true);

            query = query.Where(x => x.season_id == criteria.season_id);

            return query;
        }

        public int SearchCount(SearchCriteriaOrder criteria)
        {
            var query = SearchRequest(criteria);
            return query.Count();
        }

        public List<Objects.orders.Order> Search(SearchCriteriaOrder criteria, int limit = 10, int page = 1)
        {
            var query = SearchRequest(criteria);

            query = query.OrderBy(x => x.date_from).ThenBy(x => x.date_to);
            query = query.Skip(((page < 0 ? 0 : page) - 1) * limit);
            query = query.Take(limit);

            return Mapper.Map<List<Objects.orders.Order>>(query.ToList());
        }

        #endregion

        public Objects.orders.Order AddOrder(Objects.orders.Order item)
        {
            item.id = 0;

            //recherche saison
            if (item.season_id == 0) throw new ArgumentNullException("Season");
            var _season = _ctx.seasons.FirstOrDefault(x => x.id == item.season_id);
            if (_season == null) throw new ArgumentException("Season not exist");

            //recherche section [facultatif]
            Entities.activities.Section _section = null;
            if (item.restriction_section_id != null)
            {
                _section = _ctx.activities_sections.FirstOrDefault(x => x.id == item.restriction_section_id);
                if (_section == null) throw new ArgumentException("Section not exist");
            }

            //recherche section [facultatif]
            Entities.activities.Activity _activity = null;
            if (item.restriction_activity_id != null)
            {
                _activity = _ctx.activities.FirstOrDefault(x => x.id == item.restriction_activity_id);
                if (_activity == null) throw new ArgumentException("Activity not exist");
            }

            //recherche section [facultatif]
            Entities.activities.Category _category = null;
            if (item.restriction_category_id != null)
            {
                _category = _ctx.activities_categories.FirstOrDefault(x => x.id == item.restriction_category_id);
                if (_category == null) throw new ArgumentException("Category not exist");
            }

            //Mappage
            var _entity = Mapper.Map<Entities.orders.Order>(item);
            _entity.season = _season; _entity.season_id = _season.id;
            _entity.section = _section; _entity.restriction_section_id = (_section != null) ? (int?)_section.id : null;
            _entity.activity = _activity; _entity.restriction_activity_id = (_activity != null) ? (int?)_activity.id : null;
            _entity.category = _category; _entity.restriction_category_id = (_category != null) ? (int?)_category.id : null;

            //bdd
            _entity = _ctx.orders.Add(_entity);
            _ctx.SaveChanges();
            return Mapper.Map<Objects.orders.Order>(_entity);
        }

        public Objects.orders.Order UpdateOrder(Objects.orders.Order item)
        {
            var _entity = _ctx.orders.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Order not exist");

            //recherche saison
            if (item.season_id == 0) throw new ArgumentNullException("Season");
            var _season = _ctx.seasons.FirstOrDefault(x => x.id == item.season_id);
            if (_season == null) throw new ArgumentException("Season not exist");

            //recherche section [facultatif]
            Entities.activities.Section _section = null;
            if (item.restriction_section_id != null)
            {
                _section = _ctx.activities_sections.FirstOrDefault(x => x.id == item.restriction_section_id);
                if (_section == null) throw new ArgumentException("Section not exist");
            }

            //recherche section [facultatif]
            Entities.activities.Activity _activity = null;
            if (item.restriction_activity_id != null)
            {
                _activity = _ctx.activities.FirstOrDefault(x => x.id == item.restriction_activity_id);
                if (_activity == null) throw new ArgumentException("Activity not exist");
            }

            //recherche section [facultatif]
            Entities.activities.Category _category = null;
            if (item.restriction_category_id != null)
            {
                _category = _ctx.activities_categories.FirstOrDefault(x => x.id == item.restriction_category_id);
                if (_category == null) throw new ArgumentException("Category not exist");
            }

            //Mappage
            var __entity = Mapper.Map(item, _entity);
            __entity.season = _season; _entity.season_id = _season.id;
            __entity.section = _section; _entity.restriction_section_id = (_section != null) ? (int?)_section.id : null;
            __entity.activity = _activity; _entity.restriction_activity_id = (_activity != null) ? (int?)_activity.id : null;
            __entity.category = _category; _entity.restriction_category_id = (_category != null) ? (int?)_category.id : null;

            //bdd
            _ctx.Entry(__entity).State = System.Data.Entity.EntityState.Modified;
            _ctx.SaveChanges();
            return Mapper.Map<Objects.orders.Order>(__entity);
        }


        #region SEARCH ORDER AUTO

        public class SearchCriteriaOrderAuto
        {
            public int? orderAuto_id { get; set; }
            public int season_id { get; set; }
            public string description { get; set; }
            public int? section_id { get; set; }
            public int? activity_id { get; set; }
            public int? category_id { get; set; }
        }

        private IQueryable<Entities.orders.OrderAuto> SearchRequestOrdersAuto(SearchCriteriaOrderAuto criteria)
        {
            var query = _ctx.orders_auto.Where(x => true);

            query = query.Where(x => x.season_id == criteria.season_id);

            if(criteria.orderAuto_id != null)
            {
                query = query.Where(x => x.id == criteria.orderAuto_id);
            }
            if(criteria.description != null)
            {
                query = query.Where(x => (x.description != null) ? x.description.ToLower().Contains(criteria.description) : false);
            }
            if(criteria.section_id != null)
            {
                query = query.Where(x => x.restriction_section_id == criteria.section_id);
            }
            if(criteria.activity_id != null)
            {
                query = query.Where(x => x.restriction_activity_id == criteria.activity_id);
            }
            if (criteria.category_id != null)
            {
                query = query.Where(x => x.restriction_category_id == criteria.category_id);
            }

            return query;
        }

        public int SearchCountOrdersAuto(SearchCriteriaOrderAuto criteria)
        {
            var query = SearchRequestOrdersAuto(criteria);
            return query.Count();
        }

        public List<Objects.orders.OrderAuto> SearchOrdersAuto(SearchCriteriaOrderAuto criteria, int limit = 10, int page = 1)
        {
            var query = SearchRequestOrdersAuto(criteria);

            query = query.OrderBy(x => x.date_from).ThenBy(x => x.date_to);
            query = query.Skip(((page < 0 ? 0 : page) - 1) * limit);
            query = query.Take(limit);

            return Mapper.Map<List<Objects.orders.OrderAuto>>(query.ToList());
        }

        public Objects.orders.OrderAuto AddOrderAuto(Objects.orders.OrderAuto item)
        {
            item.id = 0;

            //recherche saison
            if (item.season == null) throw new ArgumentNullException("Season");
            var _season = _ctx.seasons.FirstOrDefault(x => x.id == item.season.id);
            if (_season == null) throw new ArgumentException("Season not exist");

            //recherche section [facultatif]
            Entities.activities.Section _section = null;
            if (item.restriction_section != null)
            {
                _section = _ctx.activities_sections.FirstOrDefault(x => x.id == item.restriction_section.id);
                if (_section == null) throw new ArgumentException("Section not exist");
            }

            //recherche section [facultatif]
            Entities.activities.Activity _activity = null;
            if (item.restriction_activity != null)
            {
                _activity = _ctx.activities.FirstOrDefault(x => x.id == item.restriction_activity.id);
                if (_activity == null) throw new ArgumentException("Activity not exist");
            }

            //recherche catégorie [facultatif]
            Entities.activities.Category _category = null;
            if (item.restriction_category != null)
            {
                _category = _ctx.activities_categories.FirstOrDefault(x => x.id == item.restriction_category.id);
                if (_category == null) throw new ArgumentException("Category not exist");
            }

            //Mappage
            var _entity = Mapper.Map<Entities.orders.OrderAuto>(item);
            _entity.season = _season; _entity.season_id = _season.id;
            _entity.restriction_section = _section; _entity.restriction_section_id = (_section != null) ? (int?)_section.id : null;
            _entity.restriction_activity = _activity; _entity.restriction_activity_id = (_activity != null) ? (int?)_activity.id : null;
            _entity.restriction_category = _category; _entity.restriction_category_id = (_category != null) ? (int?)_category.id : null;

            //bdd
            _entity = _ctx.orders_auto.Add(_entity);
            _ctx.SaveChanges();
            return Mapper.Map<Objects.orders.OrderAuto>(_entity);
        }

        public Objects.orders.OrderAuto UpdateOrderAuto(Objects.orders.OrderAuto item)
        {
            var _entity = _ctx.orders_auto.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Order not exist");

            // recherche saison
            if (item.season == null) throw new ArgumentNullException("Season");
            var _season = _ctx.seasons.FirstOrDefault(x => x.id == item.season.id);
            if (_season == null) throw new ArgumentException("Season not exist");

            //recherche section [facultatif]
            Entities.activities.Section _section = null;
            if (item.restriction_section != null)
            {
                _section = _ctx.activities_sections.FirstOrDefault(x => x.id == item.restriction_section.id);
                if (_section == null) throw new ArgumentException("Section not exist");
            }

            //recherche section [facultatif]
            Entities.activities.Activity _activity = null;
            if (item.restriction_activity != null)
            {
                _activity = _ctx.activities.FirstOrDefault(x => x.id == item.restriction_activity.id);
                if (_activity == null) throw new ArgumentException("Activity not exist");
            }

            //recherche catégorie [facultatif]
            Entities.activities.Category _category = null;
            if (item.restriction_category != null)
            {
                _category = _ctx.activities_categories.FirstOrDefault(x => x.id == item.restriction_category.id);
                if (_category == null) throw new ArgumentException("Category not exist");
            }

            //Mappage
            var __entity = Mapper.Map(item, _entity);
            __entity.season = _season; _entity.season_id = _season.id;
            __entity.restriction_section = _section; _entity.restriction_section_id = (_section != null) ? (int?)_section.id : null;
            __entity.restriction_activity = _activity; _entity.restriction_activity_id = (_activity != null) ? (int?)_activity.id : null;
            __entity.restriction_category = _category; _entity.restriction_category_id = (_category != null) ? (int?)_category.id : null;

            //bdd
            _ctx.Entry(__entity).State = System.Data.Entity.EntityState.Modified;
            _ctx.SaveChanges();
            return Mapper.Map<Objects.orders.OrderAuto>(__entity);
        }

        public void DeleteOrderAuto(Objects.orders.OrderAuto item)
        {
            var _entity = _ctx.orders_auto.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Order not exist");

            _ctx.orders_auto.Remove(_entity);
            _ctx.SaveChanges();
        }

        #endregion

    }
}
