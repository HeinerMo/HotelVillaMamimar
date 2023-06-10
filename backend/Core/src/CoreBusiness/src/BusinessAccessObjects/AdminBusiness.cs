using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreBusiness.src.BusinessAccessObjects
{
    public class AdminBusiness
    {

        private readonly AdminDataAccess adminDataAccess;

        public AdminBusiness()
        { 
            adminDataAccess = new AdminDataAccess();
        }

        public async Task<ActionResult<ResponseDTO<Admin>>> AuthenticateUser(AdminToLogin adminToLogin)
        {
            return await adminDataAccess.AuthenticateUser(adminToLogin);
        }

    }
}
