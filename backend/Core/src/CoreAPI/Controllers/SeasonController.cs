using CoreBusiness.src.BusinessAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;

namespace CoreAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class SeasonController
    {

        private readonly SeasonBusiness seasonBusiness;

        public SeasonController() 
        {
            this.seasonBusiness = new SeasonBusiness();
        }

        [HttpGet]
        [Route("GetSeason")]
        public async Task<ActionResult<ResponseDTO<List<Season>>>> GetSeason()
        { 
            return await this.seasonBusiness.GetSeason();
        }

        [HttpGet]
        [Route("GetCurrentSeason")]
        public async Task<ActionResult<ResponseDTO<Season>>> GetCurrentSeason()
        { 
            return await this.seasonBusiness.GetCurrentSeason();
        }

    }
}
