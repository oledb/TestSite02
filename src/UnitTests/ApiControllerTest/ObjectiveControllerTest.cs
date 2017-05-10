using System.Collections.Generic;
using System.Linq;
using Xunit;
using TestSite02.AbstractModel;
using TestSite02.FaketModel;
using CrudApp.Api.Controllers;
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
        private ObjectiveController Initilize()
        {
            IObjectives obj = new FakeObjectives();
            return new ObjectiveController(obj, null)
            {
                FakeUserId = "e8769835-3c14-4243-99a7-970cf91d4816"
            };
            
        }

        [Fact]
        public void ObjectiveController_Get()
        {
            //Arrange
            var controller = Initilize();

            //Act
            var list = controller.Get().ToList();

            //Assert
            Assert.Equal(2, list.Count);
            Assert.Equal("Write a letter", list[1].Name);
        }

        [Fact]
        public void ObjectiveController_Post()
        {
            //Arrange
            var controller = Initilize();
            var newObjective = new Objective { Name = "Test 04" };

            //Act
            int result = controller.Post(newObjective);
            var list = controller.Get().ToList();
            newObjective = list.Last();

            //Assert
            Assert.Equal(3, list.Count);
            Assert.Equal("Test 04", newObjective.Name);
            Assert.NotEqual(0, result);
        }

        [Fact]
        public void ObjectiveController_Put()
        {
            //Arrange
            var controller = Initilize();
            var objective = new Objective
            {
                Name = "Updated Test",
                ObjectiveId = 1
            };

            //Act
            controller.Put(objective);
            objective = controller.Get().Last();

            //Assert
            Assert.Equal("Updated Test", objective.Name);
            Assert.Equal(1, objective.ObjectiveId);
        }

        [Fact]
        public void ObjectiveController_Delete()
        {
            //Arrange
            var controller = Initilize();

            //Act
            controller.Delete(2);
            var list = controller.Get().ToList();
            var nullObjective = list.Where(o => o.ObjectiveId == 2).SingleOrDefault();

            //Assert
            Assert.Equal(2, list.Count);
            Assert.Equal(0, list[0].ObjectiveId);
            Assert.Equal(1, list[1].ObjectiveId);
            Assert.Null(nullObjective);
        }
    }
}