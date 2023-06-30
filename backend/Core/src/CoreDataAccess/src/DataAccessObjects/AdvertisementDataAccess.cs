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

            int numBytes = advertisement.HexImageString!.Length / 2;
            byte[] bytes = new byte[numBytes];
            for (int i = 0; i < numBytes; ++i)
            {
                bytes[i] = Convert.ToByte(advertisement.HexImageString!.Substring(i * 2, 2), 16);
            }

            var newAd = new Advertisement
            {
                Url = advertisement.Url,
                AdvertisementImages = new AdvertisementImage[] {
                    new AdvertisementImage
                    {
                        Image = new Image
                        {
                            UniqueIdentifier = Guid.NewGuid(),
                            ImageData = bytes
                        }
                    }
                }
            };

            _context.Advertisements.Add(newAd);
            _context.SaveChanges();

            responseDTO.Id = 1;
            responseDTO.Message = "create success";
            responseDTO.Item = advertisement;
            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<Advertisement>>> UpdateAdvertisement(Advertisement advertisement)
        {
            var dbAdvertisement = _context.Advertisements.Include(d => d.AdvertisementImages!).ThenInclude(rti => rti.Image!).FirstOrDefault(s => s.Id == advertisement.Id);

            var responseDTO = new ResponseDTO<Advertisement>();
            if (dbAdvertisement == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "update failed";
                return await Task.FromResult(responseDTO);
            }
            else
            {

                int numBytes = advertisement.HexImageString!.Length / 2;
                byte[] bytes = new byte[numBytes];
                for (int i = 0; i < numBytes; ++i)
                {
                    bytes[i] = Convert.ToByte(advertisement.HexImageString!.Substring(i * 2, 2), 16);
                }

                dbAdvertisement.Id = advertisement.Id;
                dbAdvertisement.Url = advertisement.Url;
                dbAdvertisement.AdvertisementImages!.FirstOrDefault()!.Image!.ImageData = bytes;

                _context.SaveChanges();

                responseDTO.Id = 1;
                responseDTO.Message = "update success";
                responseDTO.Item = advertisement;
                return await Task.FromResult(responseDTO);
            }
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
