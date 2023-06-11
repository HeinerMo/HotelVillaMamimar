using CoreBusiness.src.BusinessAccessObjects;
using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
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

        [HttpGet]
        [Route("GetRoomTypes")]
        public async Task<ActionResult<ResponseDTO<List<RoomType>>>> GetRoomTypes()
        {
            return await this.roomTypeBusiness.GetRoomTypes();   
        }

        [HttpGet]
        [Route("getRoomTypeFinalPrice")]
        public async Task<ActionResult<ResponseDTO<decimal>>> getRoomTypeFinalPrice(int roomTypeId)
        {
            return await roomTypeBusiness.getRoomTypeFinalPrice(roomTypeId);
        }
    }
}
