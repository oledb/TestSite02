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

namespace CrudApp.Controllers.Pages
{
    
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

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
            ViewBag.isFailedRegistry = false;
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Registry(RegisterViewModel register, string ReturnUrl = null)
        {
            ViewBag.isFailedRegistry = true;
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = register.Email, Email = register.Email };
                var result = await _userManager.CreateAsync(user, register.Password);
                if (result.Succeeded)
                {
                    ViewBag.isFailedRegistry = false;
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return RedirectToLocal("~/Default/Objective");
                }
            }
            
            return View(register);
        }

        [HttpGet]
        public IActionResult Login(string ReturnUrl = null)
        {
            ViewBag.isFailedLogin = false;
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            ViewBag.isFailedLogin = true;
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager
                    .PasswordSignInAsync(
                    model.Email,
                    model.Password,
                    model.RememberMe,
                    lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    ViewBag.isFailedLogin = false;
                    return RedirectToLocal("~/Default/Objective");
                }
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                return View(model);
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToLocal("~/default/index");
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