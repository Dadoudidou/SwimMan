using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Services.Objects.orders
{
    public class OrderAuto
    {
        public int id { get; set; }
        public DateTime date_from { get; set; }
        public DateTime date_to { get; set; }
        public string description { get; set; }

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

        public Season season { get; set; }
        public activities.Category restriction_category { get; set; }
        public activities.Activity restriction_activity { get; set; }
        public activities.Section restriction_section { get; set; }
    }
}
