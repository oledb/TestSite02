using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit.Extensions;
using Xunit;
using TestSite02.AbstractModel;
using TestSite02.FaketModel;
using CrudApp.Api.Controllers;

namespace UnitTests
{
    
    public class ObjectiveControllerTest
    {
        private ObjectiveController Initilize()
        {
            IObjectives obj = new FakeObjectives();
            return new ObjectiveController(obj);
        }

        [Fact]
        public void ObjectiveController_Get()
        {
            //Arrange
            var controller = Initilize();

            //Act
            var list = (List<Objective>)controller.Get();

            //Assert
            Assert.Equal(3, list.Count);
            Assert.Equal("Test 02", list[1].Name);
        }

        [Fact]
        public void ObjectiveController_Post()
        {
            //Arrange
            var controller = Initilize();
            var newObjective = new Objective { Name = "Test 04" };

            //Act
            controller.Post(newObjective);
            var list = (List<Objective>)controller.Get();
            newObjective = list.Last();

            //Assert
            Assert.Equal(4, list.Count);
            Assert.Equal("Test 04", newObjective.Name);
            Assert.NotEqual(0, newObjective.ObjectiveId);
        }

        [Fact]
        public void ObjectiveController_Put()
        {
            //Arrange
            var controller = Initilize();
            var objective = new Objective
            {
                Name = "Updated Test",
                ObjectiveId = 2
            };

            //Act
            controller.Put(objective);
            objective = controller.Get().Last();

            //Assert
            Assert.Equal("Updated Test", objective.Name);
            Assert.Equal(2, objective.ObjectiveId);
        }

        [Fact]
        public void ObjectiveController_Delete()
        {
            //Arrange
            var controller = Initilize();

            //Act
            controller.Delete(new Objective { ObjectiveId = 2});
            var list = (List<Objective>)controller.Get();
            var nullObjective = list.Where(o => o.ObjectiveId == 2).SingleOrDefault();

            //Assert
            Assert.Equal(2, list.Count);
            Assert.Equal(0, list[0].ObjectiveId);
            Assert.Equal(1, list[1].ObjectiveId);
            Assert.Null(nullObjective);
        }
    }
}
