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

namespace CrudApp.Pages.Controllers
{
    
    public class AccountController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signManager;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signManager)
        {
            _userManager = userManager;
            _signManager = signManager;
        }
        // GET: /<controller>/
        public IActionResult Registry(string ReturnUrl = null)
        {
            return View();
        }

        public IActionResult Login(string ReturnUrl = null)
        {
            return View();
        }

        public IActionResult ResetPassword(string ReturnUrl = null)
        {
            return View();
        }
    }
}
