using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities.users
{
    [Table("users_groups")]
    public class UserGroup
    {
        public int id { get; set; }
        public string nom { get; set; }

        public virtual List<User> users { get; set; }
        public virtual List<UserPermission> permissions { get; set; }
    }
}
