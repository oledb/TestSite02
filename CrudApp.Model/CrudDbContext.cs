using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using TestSite02.AbstractModel;

namespace TestSite02.Model
{
    public class CrudDbContext : DbContext
    {
        public DbSet<Objective> Objectives { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=CrudAppModel0001;Trusted_Connection=True;");
        }
    }
}
