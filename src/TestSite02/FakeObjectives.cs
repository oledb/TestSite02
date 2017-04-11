using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestSite02.AbstractModel;

namespace TestSite02.FaketModel
{
    public class FakeObjectives : IObjectives
    {
        private List<Objective> list;

        public FakeObjectives()
        {
            int id = 0;
            list = new List<Objective>(10)
            {
                new Objective {ObjectiveId = id++, Name = "Test 01"},
                new Objective {ObjectiveId = id++, Name = "Test 02"},
                new Objective {ObjectiveId = id++, Name = "Test 03"}
            };
        }

        public IEnumerable<Objective> GetObjectives()
        {
            return list;
        }

        public void SaveObjective(Objective obj)
        {
            list.Add(obj);
        }
    }
}
