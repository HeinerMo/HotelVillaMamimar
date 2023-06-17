using CoreBusiness.src.BusinessAccessObjects;
using CoreDataAccess.src.DataAccessObjects;
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

        
        [HttpPost]
        [Route("createAdvertisement")]
        public async Task<ActionResult<ResponseDTO<Advertisement>>> createAdvertisement(Advertisement advertisement)
        {
            return await advertisementBusiness.createAdvertisement(advertisement);
        }

        [HttpDelete]
        [Route("DeleteAdvertisement")]
        public async Task<ActionResult<ResponseDTO<List<Advertisement>>>> DeleteAdvertisement(Advertisement advertisement)
        { 
            return await advertisementBusiness.DeleteAdvertisement(advertisement);
        }

    }
}
