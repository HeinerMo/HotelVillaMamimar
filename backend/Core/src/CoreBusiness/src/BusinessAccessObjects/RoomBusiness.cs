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
    public class RoomBusiness
    {
        private readonly RoomDataAccess roomDataAccess;
        public RoomBusiness() { 
            this.roomDataAccess = new RoomDataAccess();
        }
        public async Task<ActionResult<ResponseDTO<List<Room>>>> GetAvailableRooms(string startDateString, string endDateString, int roomTypeId)
        {
            DateTime startDate = DateTime.Parse(startDateString);
            DateTime endDate = DateTime.Parse(endDateString);
            return await roomDataAccess.GetAvailableRooms(startDate, endDate, roomTypeId);
        }


    }
}
