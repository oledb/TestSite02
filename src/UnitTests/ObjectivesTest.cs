using Xunit;
using System.Linq;
using TestSite02.AbstractModel;
using CrudApp.Model;
using System.Collections.Generic;

namespace UnitTests
{
    public class ObjectivesTest
    {
        private readonly string UserIdA = "e8769835-3c14-4243-99a7-970cf91d4816";
        private Objectives Create(string dbName)
        {
            return new Objectives(new CrudDbContextInMemory(dbName));
        }

        [Fact]
        public void GetObjectives_AllObjectives_Success()
        {
            //Arrange
            Objectives obj = Create("694d7a74-84c2-45c8-9f4e-c64b472398f2");
            CrudDbContextInMemory.Use(context =>
            {
                context.Objectives.Add(new Objective
                {
                    Name = "Test task",
                    UserId = UserIdA
                });
                context.SaveChanges();
            }, "694d7a74-84c2-45c8-9f4e-c64b472398f2");

            //Act
            var list = obj.GetObjectives().ToList();

            //Assert
            Assert.Equal(UserIdA, list[0].UserId);
        }

        [Fact]
        public void SaveObjectve_NewObjective_Success()
        {
            //Arrange
            var bd = "476e0e95-c3f0-4ae4-b312-93a57d7c597f";
            Objectives obj = Create(bd);
            Objective newObj = new Objective
            {
                Name = "New One",
                UserId = UserIdA
            };

            //Act
            obj.SaveObjective(newObj);

            //Assert
            CrudDbContextInMemory.Use(context =>
            {
                var list = context.Objectives.ToList();
                Assert.NotEmpty(list);
                Assert.Equal("New One", list[0].Name);
            }, bd); 
        }

        [Fact]
        public void SaveObjectve_ReturnId_NotEqualZero()
        {
            //Arrange
            Objectives obj = Create("745cd443-75aa-4f9c-b7a1-8a1a65d5f71b");
            Objective newObj = new Objective
            {
                Name = "New One",
                UserId = UserIdA
            };

            //Act
            int id = obj.SaveObjective(newObj);

            //Assert
            Assert.NotEqual(0, id);
        }

        [Fact]
        public void RemoveObjective_ById_EmptyGet()
        {
            //Arrange
            var bd = "34890c83-2e02-4602-8457-8c80bd9a0541";
            Objectives obj = Create(bd);
            var id = 0;
            CrudDbContextInMemory.Use(context =>
            {
                var result = context.Objectives.Add(new Objective
                {
                    Name = "Test task",
                    UserId = UserIdA
                });
                context.SaveChanges();
                id = result.Entity.ObjectiveId;
            }, bd);

            //Act, Assert
            obj.RemoveObjective(id);
            CrudDbContextInMemory.Use(context =>
            {
                Assert.Empty(context.Objectives.ToList());
            }, bd);
        }
    }
}
