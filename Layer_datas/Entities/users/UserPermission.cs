using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities.users
{
    [Table("users_permissions")]
    public class UserPermission
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }

        public virtual List<UserGroup> groups { get; set; }
    }
}
