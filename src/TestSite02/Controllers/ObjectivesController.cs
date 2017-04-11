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

        //POST: Add new Objective
        [HttpPost]
        public IActionResult Modify(string name = null, int? id = null, string action = "Add")
        {
            DoAction("Add", action, string.IsNullOrWhiteSpace(name), () =>
            {
                _objectives.SaveObjective(new Objective { Name = name });
            });
            
            return Index();
        }

        private void DoAction(string action, string value, bool condition, Action act)
        {
            if (string.Compare(action, value, StringComparison.OrdinalIgnoreCase) == 0 && condition)
                act();
        }
    }
}
