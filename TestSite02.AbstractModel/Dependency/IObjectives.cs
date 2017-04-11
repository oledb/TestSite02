using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSite02.AbstractModel
{
    public interface IObjectives
    {
        IEnumerable<Objective> GetObjectives();
        void SaveObjective(Objective obj);
    }
}
