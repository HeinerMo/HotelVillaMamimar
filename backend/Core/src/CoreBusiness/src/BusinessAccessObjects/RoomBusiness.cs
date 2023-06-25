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
    public class RoomBusiness
    {
        private readonly RoomDataAccess roomDataAccess;
        public RoomBusiness() { 
            this.roomDataAccess = new RoomDataAccess();
        }

        public async Task<ActionResult<ResponseDTO<List<Room>>>> GetAllRooms()
        {
            return await this.roomDataAccess.GetAllRooms();
        }

        public async Task<ActionResult<ResponseDTO<Room>>> UpdateRoom(Room room)
        {
            return await this.roomDataAccess.UpdateRoom(room);
        }

        public async Task<ActionResult<ResponseDTO<List<Room>>>> GetAvailableRooms(string startDateString, string endDateString, int roomTypeId)
        {
            DateTime startDate = DateTime.Parse(startDateString);
            DateTime endDate = DateTime.Parse(endDateString);
            return await roomDataAccess.GetAvailableRooms(startDate, endDate, roomTypeId);
        }

        public async Task<ActionResult<ResponseDTO<List<Room>>>> GetRoomsStatus()
        {
            return await roomDataAccess.GetRoomsStatus();
        }

        public async Task<ActionResult<ResponseDTO<List<Room>>>> GetAvailableRoomsToAdmin(string startDate, string endDate, int roomTypeId)
        {
            return await roomDataAccess.GetAvailableRoomsToAdmin(startDate, endDate, roomTypeId);
        }
    }
}
