using System.Threading.Tasks;

namespace CrudApp.Service.Email
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
        Task SendEmailTemplateAsync(string email, string subject, string path);
        Task SendVerifyEmailAsync(string email, string url);
    }
}
