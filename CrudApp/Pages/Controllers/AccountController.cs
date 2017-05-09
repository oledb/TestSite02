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
using CrudApp.Models.Account;

namespace CrudApp.Pages.Controllers
{
    
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            //_logger = logger;
        }
        // GET: /<controller>/
        [HttpGet]
        public IActionResult Registry(string ReturnUrl = null)
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Registry(RegisterViewModel register, string ReturnUrl = null)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = register.Email, Email = register.Email };
                var result = await _userManager.CreateAsync(user, register.Password);
                if (result.Succeeded)
                {
                   
                    await _signInManager.SignInAsync(user, isPersistent: false);
                   // _logger.LogInformation(3, "User created a new account with password.");
                    return RedirectToLocal("~/Pages/Default/Objective");
                }
            }

            // If we got this far, something failed, redisplay form
            return View(register);
        }

        [HttpGet]
        public IActionResult Login(string ReturnUrl = null)
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToLocal("~/pages/default/index");
        }

        [HttpGet]
        public IActionResult ResetPassword(string ReturnUrl = null)
        {
            return View();
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(DefaultController.Index), "Objecitve");
            }
        }
    }
}
