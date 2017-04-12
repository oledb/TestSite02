using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestSite02.AbstractModel;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TestSite02.Controllers
{
    [Route("api/[controller]")]
    public class ObjectivesApiController : Controller
    {
        private IObjectives _objectives;

        public ObjectivesApiController(IObjectives objectives)
        {
            _objectives = objectives;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Objective> Get()
        {
            return _objectives.GetObjectives();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "testme";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
