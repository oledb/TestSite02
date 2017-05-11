using System;
using System.Collections.Generic;
using TestSite02.AbstractModel;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace CrudApp.Model
{
    public class Objectives : IObjectives, IDisposable
    {
        private CrudDbContext _context;

        public Objectives(CrudDbContext context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public IEnumerable<Objective> GetObjectives()
        {
            return _context.Objectives.ToList();
        }

        public void RemoveObjective(int id)
        {
            var temp = _context.Objectives.Where(o => o.ObjectiveId == id).SingleOrDefault();
            _context.Objectives.Remove(temp);
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
            // State is Detached in Memory
            var temp = _context.Objectives.Where(o => o.ObjectiveId == obj.ObjectiveId).SingleOrDefault();
            temp.Name = obj.Name;
            _context.SaveChanges();
        }
    }
}
