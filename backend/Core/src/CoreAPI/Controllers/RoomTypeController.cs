using CoreBusiness.src.BusinessAccessObjects;
using Microsoft.AspNetCore.Mvc;

namespace CoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomTypeController : ControllerBase
    {
        private readonly RoomTypeBusiness roomTypeBusiness;
        public RoomTypeController() { 
            this.roomTypeBusiness = new RoomTypeBusiness();
        }
    }
}
