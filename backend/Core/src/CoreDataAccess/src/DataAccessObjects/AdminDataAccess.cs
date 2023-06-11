using CoreDataAccess.src.Context;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDataAccess.src.DataAccessObjects
{
    public class AdminDataAccess
    {

        private readonly DataContext _context;

        public AdminDataAccess()
        {
            _context = new DataContext();
        }

        public async Task<ActionResult<ResponseDTO<Admin>>> AuthenticateUser(AdminToLogin adminToLogin)
        {


            var dbAdmin = _context.Admins.ToList();
            Admin toReturn = null;
            string errorMessage = "";
            foreach (Admin i in dbAdmin)
            {
                if (i.UserName == adminToLogin.UserName)
                {
                    toReturn = i;
                }
                else 
                {
                    errorMessage = "No existe este usuario";
                }
            }

            if (toReturn != null && !toReturn.Password.Equals(adminToLogin.Password)) 
            {
                errorMessage = "Contraseña incorrecta";
                toReturn = null;
            }

            var message = new ResponseDTO<Admin>();
            if (toReturn == null)
            {
                message.Id = 0;
                message.Message = errorMessage;
                return await Task.FromResult(message);
            }
            else
            {
                message.Id = 1;
                message.Item = toReturn;
            }
            return await Task.FromResult(message);

        }

        public async Task<ActionResult<ResponseDTO<int>>> CreateAdmin(Admin admin)
        {
            var response = new ResponseDTO<int>()
            {
                Id = 1,
                Message = "Solicitud realizada correctamente"
            };
            try
            {
                _context.Admins.Add(admin);
                await _context.SaveChangesAsync();
                response.Item = admin.Id ?? default(int);

            }
            catch (Exception e)
            {
                Console.WriteLine("Error");
                response.Id = 0;
                response.Message = e.ToString();
            }
            return await Task.FromResult(response);
        }

        public async Task<ActionResult<ResponseDTO<List<Admin>>>> GetAdmins()
        {

            var dbAdmin = _context.Admins.ToList();

            var responseDTO = new ResponseDTO<List<Admin>>();

            if (dbAdmin == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer la lista de administradores";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbAdmin;
            }

            return await Task.FromResult(responseDTO);
        }
    }
}
