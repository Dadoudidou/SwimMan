using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Services.Objects.members
{
    public class Adhesion
    {
        public int id { get; set; }
        public bool validate { get; set; }
        public DateTime created { get; set; }

        public orders.Order order { get; set; }
        public Member member { get; set; }
        public activities.Section section { get; set; }
        public List<activities.Session> sessions { get; set; }
    }
}
