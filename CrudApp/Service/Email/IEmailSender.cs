using System.Threading.Tasks;

namespace CrudApp.Service.Email
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
