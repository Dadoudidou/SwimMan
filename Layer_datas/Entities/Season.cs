using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities
{
    [Table("seasons")]
    public class Season: Entity
    {
        public DateTime start { get; set; }
        public DateTime end { get; set; }

        public virtual List<activities.Category> activities { get; set; }
    }
}
