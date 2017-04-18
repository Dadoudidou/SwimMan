using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Entities.activities
{
    [Table("activities_places")]
    public class Place : Entity
    {
        public string name { get; set; }
        public string adress { get; set; }
        public string postalcode { get; set; }
        public string city { get; set; }

        public virtual List<Session> sessions { get; set; }
    }
}
