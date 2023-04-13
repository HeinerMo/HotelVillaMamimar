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
    public class HotelDataAccess
    {

        private readonly DataContext _context;
        public HotelDataAccess()
        {
            _context = new DataContext();

        }

        public async Task<ActionResult<ResponseDTO<HotelInformation>>> GetHotelInformation(int hotelInforamtionId)
        {
            var dbHotelInformation = _context.HotelInformation
                .FirstOrDefaultAsync(e => e.Id == hotelInforamtionId);
            var responseDTO = new ResponseDTO<HotelInformation>();

            if (dbHotelInformation == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "No existe la informacion del hotel que desea obtener";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbHotelInformation.Result;
            }

            return await Task.FromResult(responseDTO);
        }

    }
}
