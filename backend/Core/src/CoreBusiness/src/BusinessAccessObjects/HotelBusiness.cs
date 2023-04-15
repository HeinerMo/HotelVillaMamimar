using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;


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

        public async Task<ActionResult<ResponseDTO<Location>>> GetLocation()
        {
            return await hotelDataAccess.GetLocation();
        }

    }
}
