using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestSite02.AbstractModel;
using Microsoft.AspNetCore.Authorization;
using CrudApp.Models;
using Microsoft.AspNetCore.Identity;

namespace CrudApp.Api.Controllers
{
    
    [Route("api/[controller]")]
    public class ObjectiveController : Controller
    {
        private IObjectives _objectives;
        private UserManager<ApplicationUser> _userManager;
        public string FakeUserId { get; set; }
        public ObjectiveController(IObjectives obj, UserManager<ApplicationUser> userManager)
        {
            _objectives = obj;
            _userManager = userManager;
        }

        private string GetUserId()
        {
            return _userManager == null ? FakeUserId : _userManager.GetUserId(User);
        }

        // GET: api/values
        [HttpGet]
        [Authorize]
        public IEnumerable<Objective> Get()
        {
            var userId = GetUserId();
            return _objectives.GetObjectives().Where(obj => obj.UserId == userId);
        }

        // POST api/values
        [HttpPost]
        [Authorize]
        public int Post([FromBody]Objective value)
        {
            if (value == null)
                throw new NullReferenceException();
            try
            {
                value.UserId = GetUserId();
                return _objectives.SaveObjective(value);
            }
            catch
            {
                return -100;
            }
        }

        // PUT api/values/{Objective}
        [HttpPut]
        [Authorize]
        public void Put([FromBody]Objective value)
        {
            var userId = GetUserId();
            var temp = _objectives.GetObjectives().Where(obj => obj.ObjectiveId == value.ObjectiveId).SingleOrDefault(); ;
            if (temp != null && temp.UserId == userId)
                _objectives.UpdateObjective(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        [Authorize]
        public void Delete(int id)
        {
            var userId = GetUserId();
            var temp = _objectives.GetObjectives().Where(obj => obj.ObjectiveId == id).SingleOrDefault(); ;
            if (temp != null && temp.UserId == userId)
                _objectives.RemoveObjective(id);
        }
    }
}
