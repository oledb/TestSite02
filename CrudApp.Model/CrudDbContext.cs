using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using TestSite02.AbstractModel;

namespace CrudApp.Model
{
    public class CrudDbContext : DbContext
    {
        private readonly string prodConn = @"Server=(localdb)\mssqllocaldb;Database=CrudAppModel0001;Trusted_Connection=True;";

        private readonly string InMemConn = "";

        public CrudDbContext()
        {

        }

        public DbSet<Objective> Objectives { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(prodConn);
        }
    }
}
