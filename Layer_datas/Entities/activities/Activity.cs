using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities.activities
{
    [Table("activities")]
    public class Activity: Entity
    {
        public string name { get; set; }
        public int category_id { get; set; }

        [ForeignKey("category_id")]
        public virtual Category category { get; set; }

        public virtual List<Section> sections { get; set; }
    }
}
