using System.Collections.Generic;
using System.Linq;
using TestSite02.AbstractModel;
using System;

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
            var item = GetObjectiveById(id);
            list.Remove(item);
        }

        public int SaveObjective(Objective obj)
        {
            obj.ObjectiveId = obj.ObjectiveId == 0 ? id++ : obj.ObjectiveId;
            list.Add(obj);
            return obj.ObjectiveId;
        }

        public void UpdateObjective(Objective obj)
        {
            var item = GetObjectiveById(obj.ObjectiveId);
            item.Name = obj.Name;
        }

        private Objective GetObjectiveById(int id)
        {
            var item = (from o in list
                    where o.ObjectiveId == id
                    select o).SingleOrDefault();
            if (item == null)
                throw new NullReferenceException();
            return item;
        }
    }
}
