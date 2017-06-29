using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities.members
{
    [Table("members_adhesions")]
    public class Adhesion
    {
        [Key, Column(Order = 0)]
        public int id { get; set; }
        [Key, Column(Order = 1)]
        public int order_id { get; set; }
        [Key, Column(Order = 2)]
        public int member_id { get; set; }
        public int section_id { get; set; }
        public bool validate { get; set; }

        [ForeignKey("order_id")]
        public virtual orders.Order order { get; set; }
        [ForeignKey("member_id")]
        public virtual Member member { get; set; }
    }
}
