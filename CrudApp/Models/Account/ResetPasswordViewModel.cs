using System.ComponentModel.DataAnnotations;

namespace CrudApp.Models.Account
{
    public class ResetPasswordViewModel
    {
        [Required(ErrorMessage = "Обязательное поле")]
        [StringLength(100, ErrorMessage = "{0} должен быть от {2} до {1} символов", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Подтверждение пароля")]
        [Compare("Password", ErrorMessage = "Пароли не совпадают")]
        public string ConfirmPassword { get; set; }

        public string Email { get; set; }

        public string Code { get; set; }
    }
}
