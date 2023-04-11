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

        public HotelController() { 
            this.hotelBusiness = new HotelBusiness();
        }

        [HttpGet]
        [Route("GetHotelInformation")] 
        public async Task<ActionResult<ResponseDTO<HotelInformation>>> GetHotelInformation(int hotelInforamtionId) 
        {
            return await hotelBusiness.GetHotelInformation(hotelInforamtionId);
        }

    }
}
