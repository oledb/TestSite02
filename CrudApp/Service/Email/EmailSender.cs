using System;
using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;

namespace CrudApp.Service.Email
{
    public class EmailSender : IEmailSender
    {
        private EmailLoginFrom _login;

        public EmailSender(EmailLoginFrom login)
        {
            _login = login;
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("", _login.Login));
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
    }
}
