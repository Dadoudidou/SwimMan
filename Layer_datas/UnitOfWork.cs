using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas
{
    public class UnitOfWork : IDisposable
    {

        private Context.ModelContext _context;

        public Services.Seasons seasons { get; private set; }
        public Services.Activities activities { get; private set; }
        public Services.Members members { get; private set; }
        public Services.Users users { get; private set; }

        public UnitOfWork()
        {
            _context = new Context.ModelContext();
            seasons = new Services.Seasons(_context);
            activities = new Services.Activities(_context);
            members = new Services.Members(_context);
            users = new Services.Users(_context);

            AutoMapper.Mapper.Initialize(cfg => {
                seasons.SetMaps(cfg);
                activities.SetMaps(cfg);
                members.SetMaps(cfg);
                users.SetMaps(cfg);
            });
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
