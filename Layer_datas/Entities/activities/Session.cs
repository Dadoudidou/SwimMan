using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities.activities
{
    [Table("activities_sessions")]
    public class Session : Entity
    {
        public int day { get; set; }
        public TimeSpan start { get; set; }
        public TimeSpan end { get; set; }
        public int place_id { get; set; }
        public int section_id { get; set; }
        public int nbSlots { get; set; }

        [ForeignKey("place_id")]
        public virtual Place place { get; set; }
        [ForeignKey("section_id")]
        public virtual Section section { get; set; }

        public virtual List<members.Adhesion> Adhesions { get; set; }

    }
}
