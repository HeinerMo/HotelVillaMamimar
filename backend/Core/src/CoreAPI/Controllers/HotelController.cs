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

        [HttpPut]
        [Route("UpdateAboutInformation")]
        public async Task<ActionResult<ResponseDTO<HotelInformation>>> UpdateAboutInformation(HotelInformation hotelInformation)
        {
            return await hotelBusiness.UpdateAboutInformation(hotelInformation);
        }

        [HttpPut]
        [Route("UpdateHotelLocation")]
        public async Task<ActionResult<ResponseDTO<Location>>> UpdateHotelLocation(Location location)
        {
            return await hotelBusiness.UpdateHotelLocation(location);
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

        [HttpPost]
        [Route("AddFacility")]
        public async Task<ActionResult<ResponseDTO<List<Facility>>>> AddFacility(Facility facility)
        {
            return await hotelBusiness.AddFacility(facility);
        }

        [HttpDelete]
        [Route("DeleteFacility")]
        public async Task<ActionResult<ResponseDTO<List<Facility>>>> DeleteFacility(Facility facility)
        {
            return await hotelBusiness.DeleteFacility((int)facility.Id);
        }

        [HttpPut]
        [Route("UpdateFacility")]
        public async Task<ActionResult<ResponseDTO<Facility>>> UpdateFacility(Facility facility)
        {
            return await hotelBusiness.UpdateFacility(facility);

        }
    }
}
