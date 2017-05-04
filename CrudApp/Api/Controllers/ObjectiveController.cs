using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestSite02.AbstractModel;

namespace CrudApp.Api.Controllers
{
    [Route("api/[controller]")]
    public class ObjectiveController : Controller
    {
        private IObjectives _objectives;

        public ObjectiveController(IObjectives obj)
        {
            _objectives = obj;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Objective> Get()
        {
            return _objectives.GetObjectives();
        }

        // POST api/values
        [HttpPost]
        public int Post([FromBody]Objective value)
        {
            if (value == null)
                throw new NullReferenceException();
            try
            {
                return _objectives.SaveObjective(value);
            }
            catch
            {
                return -100;
            }
        }

        // PUT api/values/{Objective}
        [HttpPut]
        public void Put([FromBody]Objective value)
        {
            _objectives.UpdateObjective(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _objectives.RemoveObjective(id);
        }
    }
}
