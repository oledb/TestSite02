using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestSite02.AbstractModel;

namespace TestSite02.Controllers
{
    [Route("api/[controller]")]
    public class ObjectivesApiController : Controller
    {
        private IObjectives _objectives;
        private ILogger _logger;

        public ObjectivesApiController(IObjectives objectives, ILoggerFactory loggerFactory)
        {
            _objectives = objectives;
            _logger = loggerFactory.CreateLogger("Api");
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
        public void Post([FromBody] Objective obj)
        {
            if (string.IsNullOrEmpty(obj?.Name))
                throw new NullReferenceException("Objecitve is null");
            _objectives.SaveObjective(obj);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string name)
        {
            
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
