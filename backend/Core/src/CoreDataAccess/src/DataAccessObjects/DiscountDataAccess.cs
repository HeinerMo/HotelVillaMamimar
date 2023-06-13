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

        public async Task<ActionResult<ResponseDTO<List<Discount>>>> GetAllDiscounts()
        {
            var responseDTO = new ResponseDTO<List<Discount>>();

            var dbDiscounts = _context.discounts.Include(d => d.RoomType).ToList();

            if (dbDiscounts == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer los descuentos";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbDiscounts;
            }

            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<Discount>>> UpdateDiscount(Discount discount)
        {
            var dbDiscount = _context.discounts.Include(d => d.RoomType).FirstOrDefault(s => s.Id == discount.Id);

            var responseDTO = new ResponseDTO<Discount>();
            if (dbDiscount == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "update failed";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                dbDiscount.Id = discount.Id;
                dbDiscount.StartingDate = discount.StartingDate;
                dbDiscount.EndingDate = discount.EndingDate;
                dbDiscount.Name = discount.Name;
                dbDiscount.Description = discount.Description;
                dbDiscount.RoomTypeId = discount.RoomTypeId;
                dbDiscount.Porcentage = discount.Porcentage;

                _context.SaveChanges();

                responseDTO.Id = 1;
                responseDTO.Message = "update success";
                responseDTO.Item = dbDiscount;
                return await Task.FromResult(responseDTO);
            }

        }

        public async Task<ActionResult<ResponseDTO<List<Discount>>>> CreateDiscount(Discount discount)
        {
            var responseDTO = new ResponseDTO<List<Discount>>();

            _context.discounts.Add(discount);

            _context.SaveChanges();

            responseDTO.Id = 1;
            responseDTO.Message = "create success";
            responseDTO.Item = _context.discounts.Include(d => d.RoomType).ToList();
            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<List<Discount>>>> DeleteDiscount(Discount discount)
        {
            var responseDTO = new ResponseDTO<List<Discount>>();

            _context.discounts.Remove(discount);

            _context.SaveChanges();

            responseDTO.Id = 1;
            responseDTO.Message = "delete success";
            responseDTO.Item = _context.discounts.Include(d => d.RoomType).ToList();
            return await Task.FromResult(responseDTO);
        }

    }
}
