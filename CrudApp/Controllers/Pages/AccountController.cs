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
using CrudApp.Service.Email;

namespace CrudApp.Controllers.Pages
{
    
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _sender;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender sender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _sender = sender;
        }

        // GET: /<controller>/
        [HttpGet]
        public IActionResult Registry(string ReturnUrl = null)
        {
            ViewBag.isFailedRegistry = false;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Registry(RegisterViewModel register, string ReturnUrl = null)
        {
            ViewBag.isFailedRegistry = true;
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = register.Email, Email = register.Email };
                var result = await _userManager.CreateAsync(user, register.Password);
                if (result.Succeeded)
                {
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var callbackUrl = Url.Action(nameof(ConfirmEmail), "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
                    await _sender.SendVerifyEmailAsync(user.Email, callbackUrl);
                    ViewBag.isFailedRegistry = false;
                    return RedirectToAction("NeedVerifyEmail", "Account");
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
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            ViewBag.isFailedLogin = true;
            if (ModelState.IsValid)
            {
                var result = await _signInManager
                    .PasswordSignInAsync(
                        model.Email,
                        model.Password,
                        model.RememberMe,
                        lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    ViewBag.isFailedLogin = false;
                    return RedirectToAction("Objective", "Default");
                }
                if (result.IsNotAllowed)
                {
                    return RedirectToAction("NeedVerifyEmail", "Account");
                }
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
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return View("Error");
            }
            var result = await _userManager.ConfirmEmailAsync(user, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        [HttpGet]
        public IActionResult ResetPassword(string ReturnUrl = null)
        {
            return View();
        }

        [HttpGet]
        public IActionResult NeedVerifyEmail()
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