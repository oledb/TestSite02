using System;
using System.Collections.Generic;
using System.Text;
using CrudApp.Model;
using Microsoft.EntityFrameworkCore;

namespace UnitTests
{
    class CrudDbContextInMemory : CrudDbContext
    {
        private string _dbName;
        protected override void SetOptions(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: _dbName);
        }

        public CrudDbContextInMemory(string dbName, DbContextOptions option = null) : base(option)
        {
            _dbName = dbName;
        }

        public static void Use(Action<CrudDbContextInMemory> use, string dbName)
        {
            using(var context = new CrudDbContextInMemory(dbName))
            {
                use(context);
            }
        }
    }
}
