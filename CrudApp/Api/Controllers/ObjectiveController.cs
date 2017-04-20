using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestSite02.AbstractModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CrudApp.Api.Controllers
{
    [Route("api/[controller]")]
    public class ObjectiveController : Controller
    {
        private IObjectives _objectives;

        public ObjectiveController(IObjectives obj)
        {
            this._objectives = obj;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Objective> Get()
        {
            return _objectives.GetObjectives();
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
