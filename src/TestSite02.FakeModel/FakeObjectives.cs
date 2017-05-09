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
                new Objective {ObjectiveId = id++, Name = "Read a book", UserId = "e8769835-3c14-4243-99a7-970cf91d4816"},
                new Objective {ObjectiveId = id++, Name = "Write a letter", UserId = "e8769835-3c14-4243-99a7-970cf91d4816"},
                new Objective {ObjectiveId = id++, Name = "Send a message", UserId = "b7130bd3-9eff-44a6-a164-20b6878891ca"},
                new Objective {ObjectiveId = id++, Name = "Learn something", UserId = "b7130bd3-9eff-44a6-a164-20b6878891ca"}
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
