using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestSite02.AbstractModel;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TestSite02.Controllers
{
    public class ObjectivesController : Controller
    {
        private IObjectives _objectives;

        public ObjectivesController(IObjectives objectives)
        {
            _objectives = objectives;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View(_objectives.GetObjectives());
        }

        [HttpPost]
        public IActionResult Index(string name)
        {
            _objectives.SaveObjective(new Objective { Name = name });
            return Index();
        }
    }
}
