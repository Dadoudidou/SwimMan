using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace Layer_datas.Services
{
    public class Logs : IService
    {
        private Context.ModelContext _ctx;

        public Logs(Context.ModelContext ctx)
        {
            _ctx = ctx;
        }

        public void SetMaps(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<Entities.Log, Objects.Log>();
            cfg.CreateMap<Objects.Log, Entities.Log>();
        }


        public Objects.Log AddMUser(Objects.Log item)
        {
            item.id = 0;
            var _entity = Mapper.Map<Entities.Log>(item);
            _entity = _ctx.logs.Add(_entity);
            _ctx.SaveChanges();
            return Mapper.Map<Objects.Log>(_entity);
        }


    }
}
