using CoreDataAccess.src.Context;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

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

        public async Task<ActionResult<ResponseDTO<List<HotelAboutImage>>>> GetGalleryAbout()
        {
            await _context.SaveChangesAsync();

            var dbGalleryAbout = _context.hotelAboutImages.Include(i => i.Image).ToList();

            var responseDTO = new ResponseDTO<List<HotelAboutImage>>();

            if (dbGalleryAbout == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer las imágenes de la galería";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbGalleryAbout;
            }

            return await Task.FromResult(responseDTO);
        }

    }
}
