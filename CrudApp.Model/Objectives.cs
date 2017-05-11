using System;
using System.Collections.Generic;
using System.Text;
using TestSite02.AbstractModel;

namespace CrudApp.Model
{
    public class Objectives : IObjectives
    {
        private CrudDbContext _context;

        public Objectives()
        {

        }

        public IEnumerable<Objective> GetObjectives()
        {
            yield return new Objective()
            {
                UserId = "e8769835-3c14-4243-99a7-970cf91d4816"
            };
        }

        public void RemoveObjective(int id)
        {
            throw new NotImplementedException();
        }

        public int SaveObjective(Objective obj)
        {
            throw new NotImplementedException();
        }

        public void UpdateObjective(Objective obj)
        {
            throw new NotImplementedException();
        }
    }
}
