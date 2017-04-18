using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer_datas.Services
{
    public interface IService
    {
        void SetMaps(AutoMapper.IMapperConfigurationExpression cfg);
    }
}
