using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities.users
{
    [Table("users")]
    public class User
    {
        public int id { get; set; }
        public string pseudo { get; set; }
        public string mdp { get; set; }
        public DateTime? last_connected { get; set; }

        public virtual List<UserGroup> groups { get; set; }
    }
}
