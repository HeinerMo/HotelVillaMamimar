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

        [HttpGet]
        [Route("GetAllRoomTypes")]
        public async Task<ActionResult<ResponseDTO<List<RoomType>>>> GetAllRoomTypes()
        {
            return await roomTypeBusiness.GetAllRoomTypes();
        }

        [HttpPut]
        [Route("UpdateRoomType")]
        public async Task<ActionResult<ResponseDTO<RoomType>>> UpdateRoomType(RoomType roomType)
        {
            return await roomTypeBusiness.UpdateRoomType(roomType);

        }

        [HttpPost]
        [Route("CreateRoomType")]
        public async Task<ActionResult<ResponseDTO<List<RoomType>>>> CreateRoomType(RoomTypeInsert roomTypeInsert)
        {
            return await roomTypeBusiness.CreateRoomType(roomTypeInsert);
        }

        [HttpDelete]
        [Route("DeleteRoomType")]
        public async Task<ActionResult<ResponseDTO<List<RoomType>>>> DeleteRoomType(RoomType roomType)
        {
            return await roomTypeBusiness.DeleteRoomType(roomType);
        }
    }
}
