using System.Collections.Generic;
using TestSite02.AbstractModel;

namespace TestSite02.FaketModel
{
    public class FakeObjectives : IObjectives
    {
        private List<Objective> list;
        private int id = 0;
        public FakeObjectives()
        {
            
            list = new List<Objective>(10)
            {
                new Objective {ObjectiveId = id++, Name = "Test 01"},
                new Objective {ObjectiveId = id++, Name = "Test 02"},
                new Objective {ObjectiveId = id++, Name = "Test 03"},
            };
        }

        public IEnumerable<Objective> GetObjectives()
        {
            return list;
        }

        public void RemoveObjective(int id)
        {
            
        }

        public void SaveObjective(Objective obj)
        {
            obj.ObjectiveId = obj.ObjectiveId == 0 ? id++ : obj.ObjectiveId;
            list.Add(obj);
        }

        public void UpdateObjective(Objective obj)
        {
            
        }
    }
}
