using CoreDataAccess.src.Context;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
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
    }
}
