using CoreDataAccess.src.Context;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CoreDataAccess.src.DataAccessObjects
{
    public class DiscountDataAccess
    {

        private readonly DataContext _context;

        public DiscountDataAccess()
        {
            _context = new DataContext();
        }

        public async Task<ActionResult<ResponseDTO<List<Discount>>>> GetDiscount()
        {
            var dbDiscount = _context.discounts.ToList();


            for (int i = dbDiscount.Count-1; i >= 0; i--)
            {

                DateTime startDate = (DateTime)dbDiscount.ElementAt(i).StartingDate;
                DateTime endingDate = (DateTime)dbDiscount.ElementAt(i).EndingDate;


                if (DateTime.Compare(DateTime.Now, startDate) <= 0 || DateTime.Compare(DateTime.Now, endingDate) >= 0)
                {
                    dbDiscount.RemoveAt(i);
                }
            }
        
       
            var responseDTO = new ResponseDTO<List<Discount>>();

            if (dbDiscount == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer los descuentos";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbDiscount;


            }

            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<Discount>>> GetDiscountByRoomType(int roomTypeId)
        {
            var dbDiscount = _context.discounts
                .Where(e => DateTime.Compare(DateTime.Now, (DateTime)e.StartingDate) >= 0 && DateTime.Compare(DateTime.Now, (DateTime)e.EndingDate) <= 0)
                .FirstOrDefault(e => e.RoomTypeId == roomTypeId); 


            var responseDTO = new ResponseDTO<Discount>();

            if (dbDiscount == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "No se encontro descuento para este tipo de cuarto";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbDiscount;


            }

            return await Task.FromResult(responseDTO);
        }

    }
}
