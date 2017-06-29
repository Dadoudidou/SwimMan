using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities.orders
{
    [Table("orders_auto")]
    public class OrderAuto
    {
        [Key]
        public int id { get; set; }
        public int season_id { get; set; }
        public DateTime date_from { get; set; }
        public DateTime date_to { get; set; }
        public string description { get; set; }

        public int? restriction_category_id { get; set; }
        public int? restriction_activity_id { get; set; }
        public int? restriction_section_id { get; set; }
        public int? restriction_age { get; set; }
        public string restriction_age_operator { get; set; }
        public string restriction_days { get; set; }
        public int? restriction_member_nb { get; set; }
        public string restriction_member_nb_operator { get; set; }
        public int? restriction_adhesion_nb { get; set; }
        public string restriction_adhesion_nb_operator { get; set; }

        public double? action_amount_fix { get; set; }
        public double? action_amount { get; set; }
        public double? action_amount_pourcent { get; set; }

        public bool apply_on_member { get; set; }
        public bool apply_on_family { get; set; }
        public bool apply_on_adhesion { get; set; }

        public int order { get; set; }

        [ForeignKey("season_id")]
        public virtual Season season { get; set; }
        [ForeignKey("restriction_category_id")]
        public virtual activities.Category restriction_category { get; set; }
        [ForeignKey("restriction_activity_id")]
        public virtual activities.Activity restriction_activity { get; set; }
        [ForeignKey("restriction_section_id")]
        public virtual activities.Section restriction_section { get; set; }
    }
}
