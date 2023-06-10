using CoreBusiness.src.BusinessAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;

namespace CoreAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {

        private readonly AdminBusiness adminBusiness;

        public AdminController() 
        { 
            this.adminBusiness = new AdminBusiness();
        }

        [HttpPost]
        [Route("AuthenticateUser")]
        public async Task<ActionResult<ResponseDTO<Admin>>> AuthenticateUser(AdminToLogin adminToLogin)
        {

            return await adminBusiness.AuthenticateUser(adminToLogin);
        }



    }
}
