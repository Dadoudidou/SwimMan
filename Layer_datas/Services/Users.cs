using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace Layer_datas.Services
{
    public class Users : IService
    {
        private Context.ModelContext _ctx;

        public Users(Context.ModelContext ctx)
        {
            _ctx = ctx;
        }

        public void SetMaps(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<Entities.users.User, Objects.users.User>()
                .ForMember(dest => dest.permissions, 
                opts => opts.MapFrom( 
                    src => src.groups.SelectMany( 
                        group => group.permissions.Select(
                            perm => perm.id
                        )
                    ) 
                ));
            cfg.CreateMap<Entities.users.UserGroup, Objects.users.UserGroup>();
            cfg.CreateMap<Entities.users.UserPermission, Objects.users.UserPermission>();

            cfg.CreateMap<Objects.users.User, Entities.users.User>();
            cfg.CreateMap<Objects.users.UserGroup, Entities.users.UserGroup>();
            cfg.CreateMap<Objects.users.UserPermission, Entities.users.UserPermission>();
        }


        #region USERS

        public Objects.users.User AddMUser(Objects.users.User item)
        {
            item.id = 0;
            var _entity = Mapper.Map<Entities.users.User>(item);
            _entity = _ctx.users.Add(_entity);
            _ctx.SaveChanges();
            return Mapper.Map<Objects.users.User>(_entity);
        }

        public Objects.users.User UpdateUser(Objects.users.User item)
        {
            var _entity = _ctx.users.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("User not exist");

            //request all attributes
            _entity.groups.ToList();

            var __entity = Mapper.Map(item, _entity);
            _ctx.Entry(__entity).State = System.Data.Entity.EntityState.Modified;
            _ctx.SaveChanges();
            return Mapper.Map<Objects.users.User>(__entity);
        }

        public void DeleteUser(Objects.users.User item)
        {
            var _entity = _ctx.users.FirstOrDefault(x => x.id == item.id);
            if (_entity == null) throw new ArgumentException("User not exist");
            _ctx.users.Remove(_entity);
            _ctx.SaveChanges();
        }

        public Objects.users.User LoginUser(string pseudo, string password)
        {
            var _entity = _ctx.users.FirstOrDefault(x => x.pseudo.ToUpper() == pseudo.ToUpper() && x.mdp == password);
            if (_entity == null) return null;

            //update last_connected
            _entity.last_connected = DateTime.Now;
            _ctx.SaveChanges();

            return Mapper.Map<Objects.users.User>(_entity);
        }

        #endregion


        #region GROUPS



        #endregion


        #region PERMISSIONS

        #endregion



    }
}
