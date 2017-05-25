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

        public IEnumerable<Objective> GetObjectives(string userId)
        {
            return _context.Objectives.Where(
                u => u.UserId == userId && 
                u.Status != ObjectiveStatus.Completed);
        }

        public void RemoveObjective(int id, string userId)
        {
            var temp = _context.Objectives
                .Where(o => o.Id == id && o.UserId == userId)
                .SingleOrDefault();
            if (temp == null)
                throw new NullReferenceException($"Element with id {id} not found");
            _context.Objectives.Remove(temp);
            _context.SaveChanges();
        }

        public int SaveObjective(Objective obj, string userId)
        {
            obj.UserId = userId;
            var result = _context.Objectives.Add(obj);
            _context.SaveChanges();
            return result.Entity.Id;
        }

        public void UpdateObjective(Objective obj, string userId)
        {
            // State is Detached in Memory
            var temp = _context.Objectives
                .Where(o => o.Id == obj.Id
                && o.UserId == userId).SingleOrDefault();
            if (temp == null)
                throw new NullReferenceException($"Element with user {obj.UserId} and id {obj.Id} not found");
            temp.Name = obj.Name;
            _context.SaveChanges();
        }
    }
}
