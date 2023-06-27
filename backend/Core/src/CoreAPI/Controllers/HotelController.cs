using CoreBusiness.src.BusinessAccessObjects;
using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;

namespace CoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelController : ControllerBase
    {

        private readonly HotelBusiness hotelBusiness;

        public HotelController()
        {
            this.hotelBusiness = new HotelBusiness();
        }

        [HttpGet]
        [Route("GetHotelInformation")]
        public async Task<ActionResult<ResponseDTO<HotelInformation>>> GetHotelInformation(int hotelInforamtionId)
        {
            return await hotelBusiness.GetHotelInformation(hotelInforamtionId);
        }

        [HttpGet]
        [Route("GetGalleryAbout")]
        public async Task<ActionResult<ResponseDTO<List<HotelAboutImage>>>> GetGalleryAbout()
        {
            return await hotelBusiness.GetGalleryAbout();
        }

        [HttpPut]
        [Route("UpdateWelcomeInformation")]
        public async Task<ActionResult<ResponseDTO<HotelInformation>>> UpdateWelcomeInformation(HotelInformation hotelInformation)
        {
            return await hotelBusiness.UpdateWelcomeInformation(hotelInformation);
        }

        [HttpGet]
        [Route("GetWelcomeImage")]
        public async Task<ActionResult<ResponseDTO<HotelWelcomeImage>>> GetWelcomeImage()
        {
            return await this.hotelBusiness.GetWelcomeImage();
        }


        [HttpGet]
        [Route("GetLocation")]
        public async Task<ActionResult<ResponseDTO<Location>>> GetLocation()
        {
            return await hotelBusiness.GetLocation();
        }

        [HttpGet]
        [Route("GetFacilities")]
        public async Task<ActionResult<ResponseDTO<List<Facility>>>> GetFacilities()
        {
            return await hotelBusiness.GetFacilities();
        }
    }
}
