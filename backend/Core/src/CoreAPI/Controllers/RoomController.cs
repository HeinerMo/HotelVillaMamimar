using CoreBusiness.src.BusinessAccessObjects;
using Microsoft.AspNetCore.Mvc;

namespace CoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {

        private readonly RoomBusiness roomBusiness;
        public RoomController() { 
            this.roomBusiness = new RoomBusiness();
        }
    }
}
