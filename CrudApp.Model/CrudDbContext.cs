using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using TestSite02.AbstractModel;
using System;

namespace CrudApp.Model
{
    public class CrudDbContext : DbContext
    {
        public CrudDbContext(DbContextOptions option) : base(option)
        {

        }

        protected virtual void SetOptions(DbContextOptionsBuilder optionsBuilder)
        {
            // Do nothing
        }

        public DbSet<Objective> Objectives { get; set; }

    }
}
