using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities.members
{
    [Table("members_metas")]
    public class Meta
    {
        [Key, Column(Order = 0)]
        public int member_id { get; set; }
        [Key, Column(Order = 1)]
        public string col_key { get; set; }
        public string col_value { get; set; }

        [ForeignKey("member_id")]
        public virtual Member member { get; set; }

    }
}
