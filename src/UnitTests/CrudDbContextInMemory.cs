using System;
using CrudApp.Model;
using Microsoft.EntityFrameworkCore;

namespace UnitTests
{
    class CrudDbContextInMemory : CrudDbContext
    {
        public CrudDbContextInMemory(string dbName, DbContextOptions option) : base(GetOptions(dbName)) { }

        public CrudDbContextInMemory(DbContextOptions option) : base(option) { }

        public static void Use(Action<CrudDbContextInMemory> use, string dbName)
        {
            using (var context = new CrudDbContextInMemory(GetOptions(dbName)))
            {
                use(context);
            }
        }

        private static DbContextOptions GetOptions(string dbName)
        {
            var builder = new DbContextOptionsBuilder<CrudDbContextInMemory>();
            builder.UseInMemoryDatabase(databaseName: dbName);
            return builder.Options;
        }
    }
}