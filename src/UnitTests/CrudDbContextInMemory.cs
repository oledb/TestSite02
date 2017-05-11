using System;
using System.Collections.Generic;
using System.Text;
using CrudApp.Model;
using Microsoft.EntityFrameworkCore;

namespace UnitTests
{
    class CrudDbContextInMemory : CrudDbContext
    {
        protected override void SetOptions(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "Add_writes_to_database");
        }


        public static void Use(Action<CrudDbContextInMemory> use)
        {
            using(var context = new CrudDbContextInMemory())
            {
                use(context);
            }
        }
    }
}
