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
using CrudApp.Service.Email;

namespace CrudApp.Controllers.Pages
{
    public class DefaultController : Controller
    {
        EmailSender _sender;

        public DefaultController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signManager,
            EmailSender sender)
        {
            _sender = sender;
        }

        // GET: /<controller>/
        public async Task<IActionResult> Index()
        {
            await _sender.SendEmailAsync("", "Привет", "Это тестовое сообщение от <span style=\"color: green\">админа</span>");
            return View();
        }

        [Authorize]
        public IActionResult Objective()
        {
            return View();
        }
    }
}
