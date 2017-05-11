using Xunit;
using System.Linq;
using TestSite02.AbstractModel;
using CrudApp.Model;

namespace UnitTests
{
    public class ObjectivesTest
    {
        private readonly string UserIdA = "e8769835-3c14-4243-99a7-970cf91d4816";
        private Objectives Create()
        {
            return new Objectives();
        }

        [Fact]
        public void GetObjectives()
        {
            //Arrange
            Objectives obj = Create();

            //Act
            var list = obj.GetObjectives().ToList();

            //Assert
            Assert.Equal(UserIdA, list[0].UserId);
        }
    }
}
