using CoreBusiness.src.BusinessAccessObjects;
using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
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


        [HttpGet]
        [Route("GetAvailableRooms")]
        public async Task<ActionResult<ResponseDTO<List<Room>>>> GetAvailableRooms()
        {
            return await roomBusiness.GetAvailableRooms();
        }
    }
}
