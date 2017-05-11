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

namespace CrudApp.Controllers.Pages
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

        [Authorize]
        public IActionResult Objective()
        {
            return View();
        }
    }
}
