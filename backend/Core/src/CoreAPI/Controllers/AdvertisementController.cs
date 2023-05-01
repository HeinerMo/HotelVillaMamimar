using CoreBusiness.src.BusinessAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;

namespace CoreAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AdvertisementController
    {

        private readonly AdvertisementBusiness advertisementBusiness;

        public AdvertisementController()
        { 
           this.advertisementBusiness = new AdvertisementBusiness();
        }

        [HttpGet]
        [Route("GetAdvertisiment")]
        public async Task<ActionResult<ResponseDTO<List<Advertisement>>>> GetAdvertisiment()
        {
            return await advertisementBusiness.GetAdvertisiment();
        }

    }
}
