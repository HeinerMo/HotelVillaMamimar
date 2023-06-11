using CoreBusiness.src.BusinessAccessObjects;
using CoreDataAccess.src.DataAccessObjects;
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
        [Route("GetAllSeasons")]
        public async Task<ActionResult<ResponseDTO<List<Season>>>> GetAllSeasons()
        {
            return await this.seasonBusiness.GetAllSeasons();
        }

        [HttpGet]
        [Route("GetCurrentSeason")]
        public async Task<ActionResult<ResponseDTO<Season>>> GetCurrentSeason()
        { 
            return await this.seasonBusiness.GetCurrentSeason();
        }

        [HttpPut]
        [Route("UpdateSeason")]
        public async Task<ActionResult<ResponseDTO<Season>>> UpdateSeason(Season season)
        {
            return await seasonBusiness.UpdateSeason(season);
        }

        [HttpPost]
        [Route("CreateSeason")]
        public async Task<ActionResult<ResponseDTO<List<Season>>>> CreateSeason(Season season)
        {
            return await seasonBusiness.CreateSeason(season);
        }

        [HttpDelete]
        [Route("DeleteSeason")]
        public async Task<ActionResult<ResponseDTO<List<Season>>>> DeleteSeason(Season season)
        {
            return await seasonBusiness.DeleteSeason(season);
        }
    }
}
