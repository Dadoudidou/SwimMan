using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities.activities
{
    [Table("activities_sections")]
    public class Section : Entity
    {
        public string name { get; set; }
        public int activity_id { get; set; }

        [ForeignKey("activity_id")]
        public virtual Activity activity { get; set; }
        public virtual List<Session> sessions { get; set; }

    }
}
