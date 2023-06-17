using CoreDataAccess.src.Context;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDataAccess.src.DataAccessObjects
{

    public class AdvertisementDataAccess
    {

        private readonly DataContext _context;

        public AdvertisementDataAccess()
        {
            _context = new DataContext();
        }

        public async Task<ActionResult<ResponseDTO<Advertisement>>> createAdvertisement(Advertisement advertisement)
        { 
            var responseDTO = new ResponseDTO<Advertisement>();

            _context.Advertisements.Add(advertisement);
            _context.SaveChanges();



            responseDTO.Id = 1;
            responseDTO.Message = "create success";
            
            return await Task.FromResult(responseDTO);
        }  

        public async Task<ActionResult<ResponseDTO<List<Advertisement>>>> GetAdvertisiment()
        {

            var dbAdvertisement = _context.Advertisements.Include(i => i.AdvertisementImages).ToList();

            foreach (Advertisement i in dbAdvertisement) 
            {
                i.AdvertisementImages = _context.AdvertisementImages.Where(e => e.AdvertisementId == i.Id).Include(j => j.Image).ToList();
            }

            var responseDTO = new ResponseDTO<List<Advertisement>>();

            if (dbAdvertisement == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer la publicidad";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbAdvertisement
                    ;
            }

            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<List<Advertisement>>>> DeleteAdvertisement(Advertisement advertisement) 
        {
            var responseDTO = new ResponseDTO<List<Advertisement>>();

            

            var dbAdversimentImage = _context.AdvertisementImages
                .FirstOrDefaultAsync(e => e.AdvertisementId == advertisement.Id);


            if (dbAdversimentImage != null) {
                var dbImage = _context.images
                    .FirstOrDefaultAsync(e => e.Id == dbAdversimentImage.Result.ImageId);

                if (dbImage != null)
                {
                    _context.AdvertisementImages.Remove(dbAdversimentImage.Result);
                    _context.images.Remove(dbImage.Result);
                    _context.Advertisements.Remove(advertisement);

                    _context.SaveChanges();
                }
            }
      

            

            responseDTO.Id = 1;
            responseDTO.Message = "delete success";
            responseDTO.Item = this.GetAdvertisiment().Result.Value.Item;
            return await Task.FromResult(responseDTO);
        }


    }
}
