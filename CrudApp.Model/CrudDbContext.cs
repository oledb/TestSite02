using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using TestSite02.AbstractModel;
using System;

namespace CrudApp.Model
{
    public class CrudDbContext : DbContext
    {
        protected virtual void SetOptions(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=CrudAppModel0001;Trusted_Connection=True;");
        }

        public DbSet<Objective> Objectives { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            SetOptions(optionsBuilder);
        }

       
    }
}
