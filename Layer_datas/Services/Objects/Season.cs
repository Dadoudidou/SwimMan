using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Services.Objects
{
    public class Season
    {
        public int id { get; set; }
        public DateTime start { get; set; }
        public DateTime end { get; set; }

        public string name { get; set; }
    }
}
