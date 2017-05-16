using Xunit;
using System.Linq;
using TestSite02.AbstractModel;
using CrudApp.Model;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace UnitTests
{
    public class ObjectivesTest
    {
        private readonly string UserIdA = "e8769835-3c14-4243-99a7-970cf91d4816";
        private Objectives Create(string dbName)
        {
            return new Objectives(new CrudDbContextInMemory(dbName, null));
        }

        [Fact]
        public void GetObjectives_AllObjectives_Success()
        {
            //Arrange
            var bd = "694d7a74-84c2-45c8-9f4e-c64b472398f2";
            Objectives obj = Create(bd);
            AddObjectiveToDb(new Objective
            {
                Name = "GetObjectives_AllObjectives",
                UserId = UserIdA
            }, bd);

            //Act
            var list = obj.GetObjectives(UserIdA).ToList();

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
                Name = "New One"
            };

            //Act
            obj.SaveObjective(newObj, UserIdA);

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
                Name = "SaveObjectve_ReturnId"
            };

            //Act
            int id = obj.SaveObjective(newObj, UserIdA);

            //Assert
            Assert.NotEqual(0, id);
        }

        [Fact]
        public void RemoveObjective_ById_EmptyGet()
        {
            //Arrange
            var bd = "34890c83-2e02-4602-8457-8c80bd9a0541";
            Objectives obj = Create(bd);
            var id = AddObjectiveToDb(new Objective
                {
                    Name = "RemoveObjective_ById",
                    UserId = UserIdA
                }, bd);

            //Act, Assert
            obj.RemoveObjective(id, UserIdA);
            CrudDbContextInMemory.Use(context =>
            {
                Assert.Empty(context.Objectives.ToList());
            }, bd);
        }

        [Fact]
        public void UpdateObjective_NewName_Success()
        {
            //Arrange
            var bd = "179d257a-33e7-48ba-90e7";
            Objectives obj = Create(bd);
            var id = AddObjectiveToDb( new Objective {
                Name = "Old task",
                UserId = UserIdA
            }, bd);

            //Act
            obj.UpdateObjective(new Objective
            {
                ObjectiveId = id,
                Name = "New task",
                UserId = UserIdA
            }, UserIdA);

            //Assert
            CrudDbContextInMemory.Use(context =>
            {
                var objective = context.Objectives.Where(o => o.ObjectiveId == id).SingleOrDefault();
                Assert.NotNull(objective);
                Assert.Equal("New task", objective.Name);
                Assert.Equal(UserIdA, objective.UserId);
            }, bd);
        }

        //Helpers
        private int AddObjectiveToDb(Objective obj, string dbSignature)
        {
            var id = -1;
            CrudDbContextInMemory.Use(context =>
            {
                var result = context.Objectives.Add(obj);
                context.SaveChanges();
                id = result.Entity.ObjectiveId;
            }, dbSignature);
            return id;
        }
    }
}
