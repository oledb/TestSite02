﻿using System;
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
            return _context.Objectives.Where(u => u.UserId == userId);
        }

        public void RemoveObjective(int id, string userId)
        {
            var temp = _context.Objectives
                .Where(o => o.ObjectiveId == id && o.UserId == userId)
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
            return result.Entity.ObjectiveId;
        }

        public void UpdateObjective(Objective obj, string userId)
        {
            // State is Detached in Memory
            var temp = _context.Objectives
                .Where(o => o.ObjectiveId == obj.ObjectiveId
                && o.UserId == userId).SingleOrDefault();
            if (temp == null)
                throw new NullReferenceException($"Element with id {obj.UserId} not found");
            temp.Name = obj.Name;
            _context.SaveChanges();
        }
    }
}
