using CoreBusiness.src.BusinessAccessObjects;
using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using System;

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
        public async Task<ActionResult<ResponseDTO<List<Room>>>> GetAvailableRooms(string startDate, string endDate, int roomTypeId)
        {
            return await roomBusiness.GetAvailableRooms(startDate, endDate, roomTypeId);
        }

        [HttpGet]
        [Route("GetRoomsStatus")]
        public async Task<ActionResult<ResponseDTO<List<Room>>>> GetRoomsStatus()
        {
            return await roomBusiness.GetRoomsStatus();
        }

        [HttpGet]
        [Route("GetAvailableRoomsToAdmin")]
        public async Task<ActionResult<ResponseDTO<List<Room>>>> GetAvailableRoomsToAdmin(string startDate, string endDate, int roomTypeId)
        {
            return await roomBusiness.GetAvailableRoomsToAdmin(startDate, endDate, roomTypeId);
        }
    }
}
