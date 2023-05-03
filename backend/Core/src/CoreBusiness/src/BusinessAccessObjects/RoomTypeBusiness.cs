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
    }
}
