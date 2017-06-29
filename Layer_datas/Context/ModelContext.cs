using MySql.Data.Entity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Layer_datas.Context
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class ModelContext: DbContext
    {

        public IDbSet<Entities.Season> seasons { get; set; }

        public IDbSet<Entities.activities.Activity> activities { get; set; }
        public IDbSet<Entities.activities.Category> activities_categories { get; set; }
        public IDbSet<Entities.activities.Place> activities_places { get; set; }
        public IDbSet<Entities.activities.Section> activities_sections { get; set; }
        public IDbSet<Entities.activities.Session> activities_sessions { get; set; }

        public IDbSet<Entities.members.Member> members { get; set; }
        public IDbSet<Entities.members.Meta> members_metas { get; set; }

        public IDbSet<Entities.users.User> users { get; set; }
        public IDbSet<Entities.users.UserGroup> users_groups { get; set; }
        public IDbSet<Entities.users.UserPermission> users_permissions { get; set; }

        public IDbSet<Entities.Log> logs { get; set; }

        public IDbSet<Entities.orders.Order> orders { get; set; }
        public IDbSet<Entities.orders.OrderAuto> orders_auto { get; set; }


        public ModelContext()
            : base(ConfigurationManager.ConnectionStrings["swiman_database"].ConnectionString)
        {

            #if DEBUG
            Database.Log = (s) => System.Diagnostics.Debug.Write(s);
            #endif
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //many to many : user - Groups
            modelBuilder.Entity<Entities.users.User>()
                .HasMany<Entities.users.UserGroup>(x => x.groups)
                .WithMany(x => x.users)
                .Map(x =>
                {
                    x.MapLeftKey("user_id");
                    x.MapRightKey("group_id");
                    x.ToTable("users_groups_relationships");
                });

            //many to many : group - permission
            modelBuilder.Entity<Entities.users.UserGroup>()
                .HasMany<Entities.users.UserPermission>(x => x.permissions)
                .WithMany(x => x.groups)
                .Map(x =>
                {
                    x.MapLeftKey("group_id");
                    x.MapRightKey("permission_id");
                    x.ToTable("users_groups_permissions_relationships");
                });
        }

        public string getTableName<T>() where T : class
        {
            var objContext = ((IObjectContextAdapter)this).ObjectContext;
            string sql = objContext.CreateObjectSet<T>().ToTraceString();
            Regex regex = new Regex(@"FROM\s+`(?<table>.+)`\s+AS");
            Match match = regex.Match(sql);
            string table = match.Groups["table"].Value;
            return table;
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

        public override int SaveChanges()
        {
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync()
        {
            return base.SaveChangesAsync();
        }

    }
}
