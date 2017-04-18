using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities
{
    public abstract class BaseEntity { }
    public abstract class Entity : BaseEntity
    {
        [Key, Column(Order = 0)]
        public int id { get; set; }
    }



    public abstract class TrackUpdateEntity : Entity
    {

        public DateTime created { get; protected set; }

        public DateTime modified { get; protected set; }

        internal void UpdateTrackingInfo(EntityState state)
        {
            if (state == EntityState.Added)
            {
                created = DateTime.Now;
                modified = DateTime.Now;
            }
            else if (state == EntityState.Modified)
            {
                modified = DateTime.Now;
            }
        }

    }
}
