using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit;

namespace CoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {


        [HttpPost]
        [Route("SendEmail")]
        public async Task<ActionResult<ResponseDTO<Email>>> SendEmail(Email email)
        {

            Console.WriteLine("Llegue");

            var response = new ResponseDTO<Email>();
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Hotel Villa Mamimar", "hotelingenieriaproyecto@gmail.com"));
            message.To.Add(new MailboxAddress(email.Name, email.EmailAdress));
            message.Subject = email.Subject;

            message.Body = new TextPart("plain")
            {
                Text = email.Body
            };

            try
            {
                using (var client = new SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    client.Authenticate("hotelingenieriaproyecto@gmail.com", "lebqhjerxezafnmz");
                    client.Send(message);
                    client.Disconnect(true);
                }

                response.Id = 1;
                response.Message = "Correo Enviado";

            }
            catch (Exception e)
            {
                response.Id = 0;
                response.Message = "Hubo un problema al enviar el correo";
            }

            return await Task.FromResult(response);
        }

    }
}
