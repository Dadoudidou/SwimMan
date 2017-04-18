using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Services.Objects.users
{
    public class User
    {
        public int id { get; set; }
        public string username { get; set; }
        public List<int> permissions { get; set; }
        public List<UserGroup> groups { get; set; }
    }
}
