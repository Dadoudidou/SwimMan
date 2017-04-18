using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities.members
{
    [Table("members")]
    public class Member : Entity
    {
        public string last_name { get; set; }
        public string first_name { get; set; }
        public DateTime birthday { get; set; }
        public bool male { get; set; }
        public string adress { get; set; }
        public string postalcode { get; set; }
        public string city { get; set; }

        public virtual List<Meta> metas { get; set; }
    }
}
