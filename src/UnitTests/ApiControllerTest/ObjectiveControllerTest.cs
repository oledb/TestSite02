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
        public void ObjectiveControllerGet()
        {
            //Arrange
            var controller = Initilize();

            //Act
            var list = (List<Objective>)controller.Get();

            //Assert
            Assert.Equal(3, list.Count);
            Assert.Equal("Test 02", list[1].Name);
        }
    }
}
