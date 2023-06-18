using CoreDataAccess.src.Context;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
            var dbRoomTypes = _context.roomTypes.Where(r => r.Id == roomTypeId && r.IsDeleted == false).ToList();

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
            var dbRoomType = _context.roomTypes.Include(i => i.RoomTypeImages)
                .Where(rt => rt.IsDeleted == false)
             .ToList();

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

        public async Task<ActionResult<ResponseDTO<List<RoomType>>>> GetAllRoomTypes()
        {
            var responseDTO = new ResponseDTO<List<RoomType>>();

            var dbRoomTypes = _context.roomTypes
                .Include(rt => rt.RoomTypeImages!)
                    .ThenInclude(rti => rti.Image!)
                .Where(rt => rt.IsDeleted == false)
                .ToList();

            if (dbRoomTypes == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer los tipos de habitación";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbRoomTypes;
            }

            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<RoomType>>> UpdateRoomType(RoomType roomType)
        {
            var dbRoomType = _context.roomTypes.Include(d => d.RoomTypeImages!).ThenInclude(rti => rti.Image!).Where(rt => rt.IsDeleted == false).FirstOrDefault(s => s.Id == roomType.Id);

            var responseDTO = new ResponseDTO<RoomType>();
            if (dbRoomType == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "update failed";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                int numBytes = roomType.HexImageString!.Length / 2;
                byte[] bytes = new byte[numBytes];
                for (int i = 0; i < numBytes; ++i)
                {
                    bytes[i] = Convert.ToByte(roomType.HexImageString!.Substring(i * 2, 2), 16);
                }

                dbRoomType.Id = roomType.Id;
                dbRoomType.Price = roomType.Price;
                dbRoomType.Description = roomType.Description;
                dbRoomType.Name = roomType.Name;
                dbRoomType.IsDeleted = roomType.IsDeleted;
                dbRoomType.RoomTypeImages!.FirstOrDefault()!.Image!.ImageData = bytes;

                _context.SaveChanges();

                responseDTO.Id = 1;
                responseDTO.Message = "update success";
                responseDTO.Item = roomType;
                return await Task.FromResult(responseDTO);
            }

        }

        public async Task<ActionResult<ResponseDTO<List<RoomType>>>> CreateRoomType(RoomType roomType)
        {
            var responseDTO = new ResponseDTO<List<RoomType>>();

            int numBytes = roomType.HexImageString!.Length / 2;
            byte[] bytes = new byte[numBytes];
            for (int i = 0; i < numBytes; ++i)
            {
                bytes[i] = Convert.ToByte(roomType.HexImageString!.Substring(i * 2, 2), 16);
            }

            var newRoomType = new RoomType
            {
                Price = roomType.Price,
                Description = roomType.Description,
                Name = roomType.Name,
                IsDeleted = roomType.IsDeleted,
                RoomTypeImages = new RoomTypeImage[] {
                    new RoomTypeImage
                    {
                        Image = new Image
                        {
                            UniqueIdentifier = Guid.NewGuid(),
                            ImageData = bytes
                        }
                    }
                }
            };

            _context.roomTypes.Add(newRoomType);
            _context.SaveChanges();

            responseDTO.Id = 1;
            responseDTO.Message = "create success";
            responseDTO.Item = _context.roomTypes.Include(d => d.RoomTypeImages!).ThenInclude(rti => rti.Image!).Where(rt => rt.IsDeleted == false).ToList();
            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<List<RoomType>>>> DeleteRoomType(RoomType roomType)
        {
            var dbRoomType = _context.roomTypes.FirstOrDefault(rt => rt.Id == roomType.Id);

            var responseDTO = new ResponseDTO<List<RoomType>>();
            if (dbRoomType == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "delete failed";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                dbRoomType.IsDeleted = true;

                _context.SaveChanges();

                responseDTO.Id = 1;
                responseDTO.Message = "delete success";
                responseDTO.Item = _context.roomTypes.Include(d => d.RoomTypeImages!).ThenInclude(rti => rti.Image!).Where(rt => rt.IsDeleted == false).ToList(); ;
                return await Task.FromResult(responseDTO);
            }

        }

    }
}
