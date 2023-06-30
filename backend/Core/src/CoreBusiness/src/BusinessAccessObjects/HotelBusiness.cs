using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CoreBusiness.src.BusinessAccessObjects
{
    public class HotelBusiness
    {

        private readonly HotelDataAccess hotelDataAccess;

        public HotelBusiness()
        {
            this.hotelDataAccess = new HotelDataAccess();
        }

        public async Task<ActionResult<ResponseDTO<HotelInformation>>> GetHotelInformation(int hotelInforamtionId)
        {
            return await hotelDataAccess.GetHotelInformation(hotelInforamtionId);
        }

        public async Task<ActionResult<ResponseDTO<List<HotelAboutImage>>>> GetGalleryAbout()
        {
            return await hotelDataAccess.GetGalleryAbout();
        }

        public async Task<ActionResult<ResponseDTO<HotelWelcomeImage>>> GetWelcomeImage()
        {
            return await hotelDataAccess.GetWelcomeImage();
        }

        public async Task<ActionResult<ResponseDTO<HotelInformation>>> UpdateWelcomeInformation(HotelInformation hotelInformation)
        {
            return await hotelDataAccess.UpdateWelcomeInformation(hotelInformation);
        }

        public async Task<ActionResult<ResponseDTO<HotelInformation>>> UpdateAboutInformation(HotelInformation hotelInformation)
        {
            return await hotelDataAccess.UpdateAboutInformation(hotelInformation);
        }

        [Route("UpdateHotelLocation")]
        public async Task<ActionResult<ResponseDTO<Location>>> UpdateHotelLocation(Location location)
        {
            return await hotelDataAccess.UpdateHotelLocation(location);
        }

        public async Task<ActionResult<ResponseDTO<Location>>> GetLocation()
        {
            return await hotelDataAccess.GetLocation();
        }

        public async Task<ActionResult<ResponseDTO<List<Facility>>>> GetFacilities()
        {
            return await hotelDataAccess.GetFacilities();
        }

        public async Task<ActionResult<ResponseDTO<List<Facility>>>> AddFacility(Facility facility)
        {
            return await hotelDataAccess.AddFacility(facility);
        }

        public async Task<ActionResult<ResponseDTO<List<Facility>>>> DeleteFacility(int facilityId)
        {
            return await hotelDataAccess.DeleteFacility(facilityId);
        }

        public async Task<ActionResult<ResponseDTO<Facility>>> UpdateFacility(Facility facility)
        {
            return await hotelDataAccess.UpdateFacility(facility);

        }




    }
}
