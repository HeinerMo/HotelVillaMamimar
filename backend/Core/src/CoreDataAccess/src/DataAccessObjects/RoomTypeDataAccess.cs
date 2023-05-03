using CoreDataAccess.src.Context;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDataAccess.src.DataAccessObjects
{
    public class RoomTypeDataAccess
    {

        private readonly DataContext _context;

        public RoomTypeDataAccess()
        {
            _context = new DataContext();
        }

        public async Task<ActionResult<ResponseDTO<List<RoomType>>>> GetRoomTypes()
        {
            var dbRoomType = _context.roomTypes.Include(i => i.RoomTypeImages).ToList();

            foreach (RoomType i in dbRoomType)
            {
                i.RoomTypeImages = _context.roomTypeImages.Where(e => e.RoomTypeId == i.Id).Include(j => j.Image).ToList();
            }

            var responseDTO = new ResponseDTO<List<RoomType>>();

            if (dbRoomType == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer los tipos de cuarto";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbRoomType
                    ;
            }

            return await Task.FromResult(responseDTO);
        }
    }
}
