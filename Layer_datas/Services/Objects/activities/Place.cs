using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Services.Objects.activities
{
    public class Place
    {
        public int id { get; set; }
        public string name { get; set; }
        public string adress { get; set; }
        public string postalcode { get; set; }
        public string city { get; set; }

    }
}
