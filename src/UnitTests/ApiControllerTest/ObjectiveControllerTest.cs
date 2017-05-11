using System.Collections.Generic;
using System.Linq;
using Xunit;
using TestSite02.AbstractModel;
using TestSite02.FaketModel;
using CrudApp.Controllers.Api;
using CrudApp.Models;
using Microsoft.AspNetCore.Identity;
using Moq;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;

namespace UnitTests
{
    public class ObjectiveControllerTest
    {
        private string _userId = "e8769835-3c14-4243-99a7-970cf91d4816";
        private IObjectives obj;
        private ObjectiveController Initilize(Objective[] objs)
        {
            if (objs == null)
                obj = new FakeObjectives(new List<Objective>());
            else
                obj = new FakeObjectives(objs.ToList());
            return new ObjectiveController(obj, null)
            {
                UserId = () => _userId
            };  
        }

        [Fact]
        public void Get_AllAvailable_Success()
        {
            //Arrange
            var controller = Initilize( new Objective[] {
                new Objective { ObjectiveId = 1, Name = "Read" , UserId =_userId},
                new Objective { ObjectiveId = 2, Name = "Write", UserId = "user"}
                });

            //Act
            var list = controller.Get().ToList();

            //Assert
            Assert.Equal(1, list.Count);
            Assert.Equal("Read", list[0].Name);
        }

        [Fact]
        public void Post_NewObjective_Success()
        {
            //Arrange
            var controller = Initilize(null);
            var newObjective = new Objective { Name = "Test 04" };

            //Act
            int result = controller.Post(newObjective);
            var list = controller.Get().ToList();
            newObjective = list.Last();

            //Assert
            Assert.Equal(1, list.Count);
            Assert.Equal("Test 04", newObjective.Name);
            Assert.NotEqual(0, result);
        }

        [Fact]
        public void Put_ExistObjective_Success()
        {
            //Arrange
            var controller = Initilize(new Objective[] {
                new Objective{ObjectiveId = 1, Name = "Old", UserId = _userId}
            });
            var objective = new Objective
            {
                Name = "New",
                ObjectiveId = 1
            };

            //Act
            controller.Put(objective);
            objective = controller.Get().Last();

            //Assert
            Assert.Equal("New", objective.Name);
            Assert.Equal(1, objective.ObjectiveId);
        }

        [Fact]
        public void Delete_FirstElement_Success()
        {
            //Arrange
            var controller = Initilize(new Objective[] {
                new Objective { ObjectiveId = 1, Name = "Read" , UserId = _userId},
                new Objective { ObjectiveId = 2, Name = "Write", UserId = _userId}
                }); ;

            //Act
            controller.Delete(1);
            var list = controller.Get().ToList();

            //Assert
            Assert.Equal(1, list.Count);
            Assert.Equal("Write", list[0].Name);
        }
    }
}