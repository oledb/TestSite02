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
            _context.Objectives.Remove(new Objective() { ObjectiveId = id });
            _context.SaveChanges();
        }

        public int SaveObjective(Objective obj)
        {
            var result = _context.Objectives.Add(obj);
            _context.SaveChanges();
            return result.Entity.ObjectiveId;
        }

        public void UpdateObjective(Objective obj)
        {
            throw new NotImplementedException();
        }
    }
}
