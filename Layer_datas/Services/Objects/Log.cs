using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Services.Objects
{
    public class Log
    {
        public Int64 id { get; set; }
        public DateTime date { get; set; }
        public string level { get; set; }
        public string message { get; set; }
        public string detail { get; set; }
        public users.User user { get; set; }
    }
}
