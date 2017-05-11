using System;
using System.Collections.Generic;
using TestSite02.AbstractModel;
using System.Linq;

namespace CrudApp.Model
{
    public class Objectives : IObjectives
    {
        private CrudDbContext _context;

        public Objectives(CrudDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Objective> GetObjectives()
        {
            return _context.Objectives.ToList();
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
