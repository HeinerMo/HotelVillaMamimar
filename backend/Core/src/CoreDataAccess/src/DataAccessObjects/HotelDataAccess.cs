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

        public async Task<ActionResult<ResponseDTO<HotelWelcomeImage>>> GetWelcomeImage()
        {

            var dbWelcomeImage = _context.hotelWelcomeImages.Include(wi => wi.Image).FirstOrDefault();

            var responseDTO = new ResponseDTO<HotelWelcomeImage>();

            if (dbWelcomeImage == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer la imagen de inicio";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbWelcomeImage;
            }

            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<HotelInformation>>> UpdateWelcomeInformation(HotelInformation hotelInformation)
        {
            var dbHotelInformation = _context.HotelInformation.FirstOrDefault();
            var dbWelcomeImage = _context.hotelWelcomeImages.Include(wi => wi.Image).FirstOrDefault();

            var responseDTO = new ResponseDTO<HotelInformation>();
            if (dbHotelInformation == null || dbWelcomeImage == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "update failed";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                int numBytes = hotelInformation.HexImageString!.Length / 2;
                byte[] bytes = new byte[numBytes];
                for (int i = 0; i < numBytes; ++i)
                {
                    bytes[i] = Convert.ToByte(hotelInformation.HexImageString!.Substring(i * 2, 2), 16);
                }

                dbWelcomeImage!.Image!.ImageData = bytes;
                dbHotelInformation.WelcomeMessage = hotelInformation.WelcomeMessage;

                _context.SaveChanges();

                responseDTO.Id = 1;
                responseDTO.Message = "update success";
                responseDTO.Item = dbHotelInformation;
                return await Task.FromResult(responseDTO);
            }
        }

        public async Task<ActionResult<ResponseDTO<HotelInformation>>> UpdateAboutInformation(HotelInformation hotelInformation)
        {
            var dbHotelInformation = _context.HotelInformation.FirstOrDefault();
            var responseDTO = new ResponseDTO<HotelInformation>();
            if (dbHotelInformation == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "update failed";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                dbHotelInformation.AboutMessage = hotelInformation.AboutMessage;
                _context.SaveChanges();
                responseDTO.Id = 1;
                responseDTO.Message = "update success";
                responseDTO.Item = dbHotelInformation;
                return await Task.FromResult(responseDTO);
            }
        }

        public async Task<ActionResult<ResponseDTO<Location>>> UpdateHotelLocation(Location location)
        {
            var dbLocation = _context.Locations.FirstOrDefault();
            var responseDTO = new ResponseDTO<Location>();
            if (dbLocation == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "update failed";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                dbLocation.ExtraDetails = location.ExtraDetails;
                _context.SaveChanges();
                responseDTO.Id = 1;
                responseDTO.Message = "update success";
                responseDTO.Item = dbLocation;
                return await Task.FromResult(responseDTO);
            }
        }

        public async Task<ActionResult<ResponseDTO<Location>>> GetLocation()
        {
            var dbLocation = _context.Locations
    .FirstOrDefaultAsync(e => e.Id == 1);
            var responseDTO = new ResponseDTO<Location>();

            if (dbLocation == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "No existe la ubicación que desea obtener";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbLocation.Result;
            }

            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<List<Facility>>>> GetFacilities()
        {

            var dbFacilities = _context.Facilities.Include(i => i.FacilityImages).ToList();

            foreach (Facility i in dbFacilities)
            {
                i.FacilityImages = _context.facilityImages.Where(e => e.FacilityId == i.Id).Include(j => j.Image).ToList();
            }

            var responseDTO = new ResponseDTO<List<Facility>>();

            if (dbFacilities == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer las facilidades";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbFacilities
                    ;
            }

            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<List<Facility>>>> AddFacility(Facility facility)
        {
            var responseDTO = new ResponseDTO<List<Facility>>();

            int numBytes = facility.HexImageString!.Length / 2;
            byte[] bytes = new byte[numBytes];
            for (int i = 0; i < numBytes; ++i)
            {
                bytes[i] = Convert.ToByte(facility.HexImageString!.Substring(i * 2, 2), 16);
            }

            var newFacility = new Facility
            {
                Description = facility.Description,
                FacilityImages = new FacilityImage[] {
                    new FacilityImage
                    {
                        Image = new Image
                        {
                            UniqueIdentifier = Guid.NewGuid(),
                            ImageData = bytes
                        }
                    }
                }
            };

            _context.Facilities.Add(newFacility);
            _context.SaveChanges();
            // Cargar la lista actualizada de facilidades (incluyendo las imágenes)
            var updatedFacilities = _context.Facilities.Include(d => d.FacilityImages!).ThenInclude(rti => rti.Image!).ToList();


            responseDTO.Id = 1;
            responseDTO.Message = "create success";
            responseDTO.Item = updatedFacilities;
            return await Task.FromResult(responseDTO);
        }


        public async Task<ActionResult<ResponseDTO<List<Facility>>>> DeleteFacility(int facilityId)
        {
            var responseDTO = new ResponseDTO<List<Facility>>();

            try
            {
                var dbFacility = await _context.Facilities.Include(i => i.FacilityImages).FirstOrDefaultAsync(f => f.Id == facilityId);

                if (dbFacility == null)
                {
                    responseDTO.Id = 0;
                    responseDTO.Message = "No se encontró la facilidad con el ID especificado";
                    return responseDTO;
                }

                // Eliminar los registros relacionados en la tabla tb_facility_image
                var facilityImages = _context.facilityImages.Where(fi => fi.FacilityId == facilityId);
                _context.facilityImages.RemoveRange(facilityImages);

                _context.Facilities.Remove(dbFacility);
                await _context.SaveChangesAsync();

                // Cargar la lista actualizada de facilidades (incluyendo las imágenes)
                var updatedFacilities = _context.Facilities.Include(d => d.FacilityImages!).ThenInclude(rti => rti.Image!).ToList();
                 

                responseDTO.Id = 1;
                responseDTO.Message = "Eliminación exitosa";
                responseDTO.Item = updatedFacilities;

                return responseDTO;
            }
            catch (Exception ex)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al eliminar la facilidad: " + ex.InnerException?.Message ?? ex.Message;
                return responseDTO;
            }
        }


        public async Task<ActionResult<ResponseDTO<Facility>>> UpdateFacility(Facility facility)
        {
            var dbFacility = _context.Facilities.Include(d => d.FacilityImages!).ThenInclude(rti => rti.Image!).FirstOrDefault(s => s.Id == facility.Id);

            var responseDTO = new ResponseDTO<Facility>();
            if (dbFacility == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "update failed";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                int numBytes = facility.HexImageString!.Length / 2;
                byte[] bytes = new byte[numBytes];
                for (int i = 0; i < numBytes; ++i)
                {
                    bytes[i] = Convert.ToByte(facility.HexImageString!.Substring(i * 2, 2), 16);
                }

                dbFacility.Id = facility.Id;
                dbFacility.Description = facility.Description;
                dbFacility.FacilityImages!.FirstOrDefault()!.Image!.ImageData = bytes;

                _context.SaveChanges();

                responseDTO.Id = 1;
                responseDTO.Message = "update success";
                responseDTO.Item = facility;
                return await Task.FromResult(responseDTO);
            }

        }




    }
}
