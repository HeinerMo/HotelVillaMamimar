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
        private readonly DiscountDataAccess discountDataAccess;
        private readonly SeasonDataAccess seasonDataAccess;

        public RoomTypeDataAccess()
        {
            _context = new DataContext();
            discountDataAccess = new DiscountDataAccess();
            seasonDataAccess = new SeasonDataAccess();
        }

        public List<RoomType> GetImagesForRoomTypes(List<RoomType> roomTypes) 
        {
            foreach (RoomType i in roomTypes)
            {
                i.RoomTypeImages = _context.roomTypeImages.Where(e => e.RoomTypeId == i.Id).Include(j => j.Image).ToList();
            }
            return roomTypes;
        }

        public async Task<ActionResult<ResponseDTO<decimal>>> getRoomTypeFinalPrice(int roomTypeId)
        {
            var dbRoomTypes = _context.roomTypes.Where(r => r.Id == roomTypeId).ToList();

            var responseDTO = new ResponseDTO<decimal>();

            if (dbRoomTypes.Count == 0)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "get by id error";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;

                responseDTO.Item = 0;
                this.PriceRoomTypes(dbRoomTypes).ForEach(r =>
                {
                    if (r.Id == roomTypeId)
                    {
                        responseDTO.Item = (decimal)r.FinalPrice;
                    }
                });

                return await Task.FromResult(responseDTO);
            }
        }

        public List<RoomType> PriceRoomTypes(List<RoomType> roomTypes)
        {
            Discount discounts;
            var season = seasonDataAccess.GetCurrentSeason().Result.Value.Item;
            decimal seasonPercentage = 0;
            decimal discountPercentage = 0;

            if (season != null)
            {
                seasonPercentage = Decimal.Divide((Decimal)season.Porcentage, 100);
            }

            foreach (RoomType i in roomTypes)
            {
                discountPercentage = 0;
                i.FinalPrice = i.Price + (i.Price * seasonPercentage);
                discounts = discountDataAccess.GetDiscountByRoomType((int)i.Id).Result.Value.Item;
                if (discounts != null)
                {
                    discountPercentage = Decimal.Divide((Decimal)discounts.Porcentage, 100);                  
                    i.Discount = discounts.Porcentage;
                }
                i.FinalPrice = i.FinalPrice - (i.FinalPrice * discountPercentage);
                
                
               
               
            }
            return roomTypes;
        }


        public async Task<ActionResult<ResponseDTO<List<RoomType>>>> GetRoomTypes()
        {
            var dbRoomType = _context.roomTypes.Include(i => i.RoomTypeImages).ToList();                       

            if (dbRoomType != null) 
            {   
                dbRoomType = GetImagesForRoomTypes(dbRoomType);         
                dbRoomType = PriceRoomTypes(dbRoomType);
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
                responseDTO.Item = dbRoomType;
            }

            return await Task.FromResult(responseDTO);
        }
    }
}
