using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities
{
    [Table("logs")]
    public class Log
    {
        public Int64 id { get; set; }
        public int user_id { get; set; }
        public DateTime date { get; set; }
        public string level { get; set; }
        public string message { get; set; }
        public string detail { get; set; }

        [ForeignKey("user_id")]
        public virtual users.User user { get; set; }
    }
}
