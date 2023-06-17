using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreBusiness.src.BusinessAccessObjects
{
    public class RoomTypeBusiness
    {
        private readonly RoomTypeDataAccess roomTypeDataAccess;
        public RoomTypeBusiness() {
            this.roomTypeDataAccess = new RoomTypeDataAccess();
        }

        public async Task<ActionResult<ResponseDTO<List<RoomType>>>> GetRoomTypes()
        {
            return await roomTypeDataAccess.GetRoomTypes();
        }

        public async Task<ActionResult<ResponseDTO<decimal>>> getRoomTypeFinalPrice(int roomTypeId)
        {
            return await roomTypeDataAccess.getRoomTypeFinalPrice(roomTypeId);
        }

        public async Task<ActionResult<ResponseDTO<List<RoomType>>>> GetAllRoomTypes()
        {
            return await roomTypeDataAccess.GetAllRoomTypes();
        }

        public async Task<ActionResult<ResponseDTO<RoomType>>> UpdateRoomType(RoomType roomType)
        {
            return await roomTypeDataAccess.UpdateRoomType(roomType);

        }

        public async Task<ActionResult<ResponseDTO<List<RoomType>>>> CreateRoomType(RoomTypeInsert roomTypeInsert)
        {
            return await roomTypeDataAccess.CreateRoomType(roomTypeInsert);
        }

        public async Task<ActionResult<ResponseDTO<List<RoomType>>>> DeleteRoomType(RoomType roomType)
        {
            return await roomTypeDataAccess.DeleteRoomType(roomType);
        }
    }
}
