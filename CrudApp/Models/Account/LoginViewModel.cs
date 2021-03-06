﻿using System.ComponentModel.DataAnnotations;

namespace CrudApp.Models.Account
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Обязательное поле")]
        [EmailAddress(ErrorMessage = "Почта имеет неправильный формат")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Обязательное поле")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Запомнить?")]
        public bool RememberMe { get; set; }
    }
}
