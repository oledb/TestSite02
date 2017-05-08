using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CrudApp.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace CrudApp.Pages.Controllers
{
    public class DefaultController : Controller
    {
        public DefaultController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signManager)
        {

        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
