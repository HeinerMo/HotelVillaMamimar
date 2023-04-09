using CoreBusiness.src.BusinessAccessObjects;
using CoreDataAccess.src.DataAccessObjects;
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
    }
}
