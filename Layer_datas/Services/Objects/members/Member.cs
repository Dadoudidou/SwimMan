using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Services.Objects.members
{
    public class Member
    {
        public int id { get; set; }
        public string last_name { get; set; }
        public string first_name { get; set; }
        public DateTime birthday { get; set; }
        public bool male { get; set; }
        public string adress { get; set; }
        public string postalcode { get; set; }
        public string city { get; set; }

        public List<MemberMeta> metas { get; set; }
    }
}
