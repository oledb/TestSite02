using System;
using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
using System.IO;

namespace CrudApp.Service.Email
{
    public class EmailSender : IEmailSender
    {
        private EmailLoginFrom _login;

        public EmailSender(EmailLoginFrom login)
        {
            _login = login ?? throw new ArgumentNullException("EmailLoginFrom is null");
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("Timewatch.pw", _login.Login));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.yandex.ru", 25, false);
                await client.AuthenticateAsync(_login.Login, _login.Password);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
        }

        public async Task SendEmailTemplateAsync(string email, string subject, string path)
        {
            var template = getTemplateSource(path);
            await SendEmailAsync(email, subject, template);
        }

        public async Task SendVerifyEmailAsync(string email, string url)
        {
            var template = getTemplateSource("VerifyEmail.html")
                .Replace("%%url%%", url);
            await SendEmailAsync(email, "Подтверждение", template);
        }

        public async Task SendResetPasswordEmailAsync(string email, string url)
        {
            var template = getTemplateSource("ResetPasswordEmail.html")
                .Replace("%%url%%", url);
            await SendEmailAsync(email, "Сброс пароля", template);
        }

        private string getTemplateSource(string path)
        {
            var file = Path.Combine(Directory.GetCurrentDirectory(), "Emails", path);
            if (!File.Exists(file))
                throw new FileNotFoundException($"File '{path}' not found");
            return File.ReadAllText(file);
        }
    }
}
