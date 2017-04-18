using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities.activities
{
    [Table("activities_categories")]
    public class Category : Entity
    {
        public string name { get; set; }

        public int season_id { get; set; }

        public virtual List<Activity> activities { get; set; }

        [ForeignKey("season_id")]
        public virtual Season season { get; set; }
    }
}
