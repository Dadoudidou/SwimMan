using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace Layer_datas.Services
{
    public class Activities : IService
    {
        private Context.ModelContext _ctx;


        public Activities(Context.ModelContext ctx)
        {
            _ctx = ctx;
        }

        public void SetMaps(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<Entities.activities.Activity, Objects.activities.Activity>();
            cfg.CreateMap<Entities.activities.Category, Objects.activities.Category>();
            cfg.CreateMap<Entities.activities.Place, Objects.activities.Place>();
            cfg.CreateMap<Entities.activities.Section, Objects.activities.Section>();
            cfg.CreateMap<Entities.activities.Session, Objects.activities.Session>();

            cfg.CreateMap<Objects.activities.Activity, Entities.activities.Activity>();
            cfg.CreateMap<Objects.activities.Category, Entities.activities.Category>();
            cfg.CreateMap<Objects.activities.Place, Entities.activities.Place>();
            cfg.CreateMap<Objects.activities.Section, Entities.activities.Section>();
            cfg.CreateMap<Objects.activities.Session, Entities.activities.Session>();
        }


        #region CATEGORIES

        public Objects.activities.Category AddCategory(Objects.activities.Category item, Objects.Season season)
        {
            if (season == null) throw new ArgumentNullException("Season");
            var _season = _ctx.seasons.FirstOrDefault(x => x.id == season.id);
            if (_season == null) throw new ArgumentException("Season not exist");
            item.id = 0;
            var _entity = Mapper.Map<Entities.activities.Category>(item);
            _entity.season = _season;
            _entity.season_id = _season.id;
            _entity = _ctx.activities_categories.Add(_entity);
            _ctx.SaveChanges();
            return Mapper.Map<Objects.activities.Category>(_entity);
        }

        public Objects.activities.Category UpdateCategory(Objects.activities.Category item)
        {
            var _entity = _ctx.activities_categories.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Category not exist");

            var __entity = Mapper.Map(item, _entity);
            _ctx.Entry(__entity).State = System.Data.Entity.EntityState.Modified;
            _ctx.SaveChanges();
            return Mapper.Map<Objects.activities.Category>(__entity);
        }

        public void DeleteCategory(Objects.activities.Category item)
        {
            var _entity = _ctx.activities_categories.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Category not exist");
            _ctx.activities_categories.Remove(_entity);
            _ctx.SaveChanges();
        }

        public List<Objects.activities.Category> GetsCategories()
        {
            var query = _ctx.activities_categories.Where(x => true);
            query = query.OrderBy(x => x.name);
            return Mapper.Map<List<Objects.activities.Category>>(query.ToList());
        }

        #endregion


        #region ACTIVITIES

        public Objects.activities.Activity AddActivity(Objects.activities.Activity item)
        {
            item.id = 0;

            //parent exist ?
            if (item == null) throw new ArgumentException("Activity is null");
            if (item.category == null) throw new ArgumentException("Category is null");
            var _parent = _ctx.activities_categories.FirstOrDefault(x => x.id == item.category.id);
            if (_parent == null) throw new ArgumentException("Category not exist");

            var _entity = Mapper.Map<Entities.activities.Activity>(item);
            _entity.category = _parent;
            _entity.category_id = _parent.id;
            _entity = _ctx.activities.Add(_entity);
            _ctx.SaveChanges();
            return Mapper.Map<Objects.activities.Activity>(_entity);
        }

        public Objects.activities.Activity UpdateActivity(Objects.activities.Activity item)
        {
            if (item == null) throw new ArgumentException("Activity is null");

            var _entity = _ctx.activities.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Activity not exist");

            //parent exist ?
            if (item.category == null) throw new ArgumentException("Category is null");
            var _parent = _ctx.activities_categories.FirstOrDefault(x => x.id == item.category.id);
            if (_parent == null) throw new ArgumentException("Category not exist");

            _entity.category = _parent;
            _entity.category_id = _parent.id;

            var __entity = Mapper.Map(item, _entity);
            _ctx.Entry(__entity).State = System.Data.Entity.EntityState.Modified;
            _ctx.SaveChanges();

            return Mapper.Map<Objects.activities.Activity>(__entity);
        }

        public void DeleteActivity(Objects.activities.Activity item)
        {
            var _entity = _ctx.activities.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Activity not exist");
            _ctx.activities.Remove(_entity);
            _ctx.SaveChanges();
        }

        public List<Objects.activities.Activity> GetsActivities(Objects.activities.Category category = null)
        {
            var query = _ctx.activities.Where(x => true);
            if(category != null)
            {
                query = query.Where(x => x.category_id == category.id);
            }
            query = query.OrderBy(x => x.name);
            return Mapper.Map<List<Objects.activities.Activity>>(query.ToList());
        }

        #endregion


        #region SECTIONS

        public Objects.activities.Section AddSection(Objects.activities.Section item)
        {
            item.id = 0;

            //parent exist ?
            if (item == null) throw new ArgumentException("Section is null");
            if (item.activity == null) throw new ArgumentException("Activity is null");
            var _parent = _ctx.activities.FirstOrDefault(x => x.id == item.activity.id);
            if (_parent == null) throw new ArgumentException("Activity not exist");

            var _entity = Mapper.Map<Entities.activities.Section>(item);
            _entity.activity = _parent;
            _entity.activity_id = _parent.id;
            _entity = _ctx.activities_sections.Add(_entity);
            _ctx.SaveChanges();
            return Mapper.Map<Objects.activities.Section>(_entity);
        }

        public Objects.activities.Section UpdateSection(Objects.activities.Section item)
        {
            if (item == null) throw new ArgumentException("Section is null");

            var _entity = _ctx.activities_sections.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Section not exist");

            //parent exist ?
            if (item.activity == null) throw new ArgumentException("Activity is null");
            var _parent = _ctx.activities.FirstOrDefault(x => x.id == item.activity.id);
            if (_parent == null) throw new ArgumentException("Activity not exist");

            _entity.activity = _parent;
            _entity.activity_id = _parent.id;

            var __entity = Mapper.Map(item, _entity);
            _ctx.Entry(__entity).State = System.Data.Entity.EntityState.Modified;
            _ctx.SaveChanges();

            return Mapper.Map<Objects.activities.Section>(__entity);
        }

        public void DeleteSection(Objects.activities.Section item)
        {
            var _entity = _ctx.activities_sections.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Section not exist");
            _ctx.activities_sections.Remove(_entity);
            _ctx.SaveChanges();
        }

        public List<Objects.activities.Section> GetsSections(Objects.activities.Activity activity = null)
        {
            var query = _ctx.activities_sections.Where(x => true);
            if (activity != null)
            {
                query = query.Where(x => x.activity_id == activity.id);
            }
            query = query.OrderBy(x => x.name);
            return Mapper.Map<List<Objects.activities.Section>>(query.ToList());
        }

        #endregion


        #region PLACES

        public Objects.activities.Place AddPlace(Objects.activities.Place item)
        {
            item.id = 0;
            var _entity = Mapper.Map<Entities.activities.Place>(item);
            _entity = _ctx.activities_places.Add(_entity);
            _ctx.SaveChanges();
            return Mapper.Map<Objects.activities.Place>(_entity);
        }

        public Objects.activities.Place UpdatePlace(Objects.activities.Place item)
        {
            var _entity = _ctx.activities_places.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Place not exist");

            var __entity = Mapper.Map(item, _entity);
            _ctx.Entry(__entity).State = System.Data.Entity.EntityState.Modified;
            _ctx.SaveChanges();
            return Mapper.Map<Objects.activities.Place>(__entity);
        }

        public void DeletePlace(Objects.activities.Place item)
        {
            var _entity = _ctx.activities_places.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Place not exist");
            _ctx.activities_places.Remove(_entity);
            _ctx.SaveChanges();
        }

        public List<Objects.activities.Place> GetsPlaces()
        {
            var query = _ctx.activities_places.Where(x => true);
            query = query.OrderBy(x => x.name);
            return Mapper.Map<List<Objects.activities.Place>>(query.ToList());
        }

        #endregion


        #region SESSIONS

        public Objects.activities.Session AddSession(Objects.activities.Session item)
        {
            if (item == null) throw new ArgumentException("Session is null");

            item.id = 0;

            //place exist ?
            if (item.place == null) throw new ArgumentException("Place is null");
            var _place = _ctx.activities_places.FirstOrDefault(x => x.id == item.place.id);
            if (_place == null) throw new ArgumentException("Place not exist");

            //section exist ?
            if (item.section == null) throw new ArgumentException("Section is null");
            var _section = _ctx.activities_sections.FirstOrDefault(x => x.id == item.section.id);
            if (_section == null) throw new ArgumentException("Section not exist");

            var _entity = Mapper.Map<Entities.activities.Session>(item);
            _entity.place = _place;
            _entity.place_id = _place.id;
            _entity.section = _section;
            _entity.section_id = _section.id;
            _entity = _ctx.activities_sessions.Add(_entity);
            _ctx.SaveChanges();
            return Mapper.Map<Objects.activities.Session>(_entity);
        }

        public Objects.activities.Session UpdateSession(Objects.activities.Session item)
        {
            if (item == null) throw new ArgumentException("Session is null");

            var _entity = _ctx.activities_sessions.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Session not exist");

            //place exist ?
            if (item.place == null) throw new ArgumentException("Place is null");
            var _place = _ctx.activities_places.FirstOrDefault(x => x.id == item.place.id);
            if (_place == null) throw new ArgumentException("Place not exist");

            //section exist ?
            if (item.section == null) throw new ArgumentException("Section is null");
            var _section = _ctx.activities_sections.FirstOrDefault(x => x.id == item.section.id);
            if (_section == null) throw new ArgumentException("Section not exist");

            _entity.place = _place;
            _entity.place_id = _place.id;
            _entity.section = _section;
            _entity.section_id = _section.id;

            var __entity = Mapper.Map(item, _entity);
            _ctx.Entry(__entity).State = System.Data.Entity.EntityState.Modified;
            _ctx.SaveChanges();

            return Mapper.Map<Objects.activities.Session>(__entity);
        }

        public void DeleteSession(Objects.activities.Session item)
        {
            var _entity = _ctx.activities_sessions.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Session not exist");
            _ctx.activities_sessions.Remove(_entity);
            _ctx.SaveChanges();
        }

        public List<Objects.activities.Session> GetsSessions(Objects.activities.Section section = null, Objects.activities.Place place = null)
        {
            var query = _ctx.activities_sessions.Where(x => true);
            if (section != null)
            {
                query = query.Where(x => x.section_id == section.id);
            }
            if(place != null)
            {
                query = query.Where(x => x.place_id == place.id);
            }
            query = query.OrderBy(x => x.day);
            return Mapper.Map<List<Objects.activities.Session>>(query.ToList());
        }

        #endregion


    }
}
