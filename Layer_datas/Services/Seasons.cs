using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace Layer_datas.Services
{
    public class Seasons : IService
    {

        private Context.ModelContext _ctx;


        public Seasons(Context.ModelContext ctx)
        {
            _ctx = ctx;
        }

        public void SetMaps(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<Entities.Season, Objects.Season>();
            cfg.CreateMap<Objects.Season, Entities.Season>();
        }


        public Objects.Season Add(Objects.Season item)
        {
            item.id = 0;
            var _entity = Mapper.Map<Entities.Season>(item);
            _entity = _ctx.seasons.Add(_entity);
            _ctx.SaveChanges();
            return Mapper.Map<Objects.Season>(_entity);
        }

        public Objects.Season Update(Objects.Season item)
        {
            var _entity = _ctx.seasons.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Season not exist");

            var __entity = Mapper.Map(item, _entity);
            _ctx.Entry(__entity).State = System.Data.Entity.EntityState.Modified;
            _ctx.SaveChanges();
            return Mapper.Map<Objects.Season>(__entity);
        }

        public void Delete(Objects.Season item)
        {
            var _entity = _ctx.seasons.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("Season not exist");
            _ctx.seasons.Remove(_entity);
            _ctx.SaveChanges();
        }

        public List<Objects.Season> Gets(DateTime start = default(DateTime), DateTime end = default(DateTime))
        {
            var query = _ctx.seasons.Where(x => true);
            if(start != default(DateTime))
            {
                query = query.Where(x => x.start >= start);
            }
            if(end != default(DateTime))
            {
                query = query.Where(x => x.end <= end);
            }
            return Mapper.Map<List<Objects.Season>>(query.ToList());
        }

        public Objects.Season Get(DateTime date)
        {
            var query = _ctx.seasons.FirstOrDefault(x => date >= x.start && date <= x.end);
            if (query == null) return null;
            return Mapper.Map<Objects.Season>(query);
        }

    }
}
