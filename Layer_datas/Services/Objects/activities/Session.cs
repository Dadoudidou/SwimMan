using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Services.Objects.activities
{
    public class Session
    {
        public int id { get; set; }
        public int day { get; set; }
        public TimeSpan start { get; set; }
        public TimeSpan end { get; set; }
        public int nbSlots { get; set; }

        public Place place { get; set; }
        public Section section { get; set; }

    }
}
