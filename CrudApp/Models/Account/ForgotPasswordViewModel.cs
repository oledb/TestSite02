using System.ComponentModel.DataAnnotations;

namespace CrudApp.Models.Account
{
    public class ForgotPasswordViewModel
    {
        [Required(ErrorMessage = "Обязательное поле")]
        [EmailAddress(ErrorMessage = "Почта имеет неправильный формат")]
        public string Email { get; set; }
    }
}
