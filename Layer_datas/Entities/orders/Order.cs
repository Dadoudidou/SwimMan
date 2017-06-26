using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities.orders
{
    [Table("orders")]
    public class Order
    {
        [Key]
        public int id { get; set; }
        public string label { get; set; }
        public DateTime date_from { get; set; }
        public DateTime date_to { get; set; }
        public int? restriction_session_min { get; set; }
        public int? restriction_session_max { get; set; }
        public int? restriction_section_id { get; set; }
        public int? restriction_activity_id { get; set; }
        public int? restriction_category_id { get; set; }
        public bool is_card { get; set; }
        public int card_nb_session { get; set; }
        public double amount { get; set; }
        public int season_id { get; set; }

        [ForeignKey("season_id")]
        public virtual Season season { get; set; }
        [ForeignKey("restriction_category_id")]
        public virtual activities.Category category { get; set; }
        [ForeignKey("restriction_activity_id")]
        public virtual activities.Activity activity { get; set; }
        [ForeignKey("restriction_section_id")]
        public virtual activities.Section section { get; set; }
    }
}
