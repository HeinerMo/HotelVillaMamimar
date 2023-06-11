using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreBusiness.src.BusinessAccessObjects
{
    public class SeasonBusiness
    {

        private readonly SeasonDataAccess seasonDataAccess;

        public SeasonBusiness()
        {
            seasonDataAccess = new SeasonDataAccess();
        }

        public async Task<ActionResult<ResponseDTO<List<Season>>>> GetSeason()
        {
            return await seasonDataAccess.GetSeason();
        }

        public async Task<ActionResult<ResponseDTO<List<Season>>>> GetAllSeasons()
        {
            return await this.seasonDataAccess.GetAllSeasons();
        }


        public async Task<ActionResult<ResponseDTO<Season>>> GetCurrentSeason()
        {
            return await seasonDataAccess.GetCurrentSeason();
        }

        public async Task<ActionResult<ResponseDTO<Season>>> UpdateSeason(Season season)
        {
            return await seasonDataAccess.UpdateSeason(season);
        }

        public async Task<ActionResult<ResponseDTO<List<Season>>>> CreateSeason(Season season)
        {
            return await seasonDataAccess.CreateSeason(season);
        }

        public async Task<ActionResult<ResponseDTO<List<Season>>>> DeleteSeason(Season season)
        {
            return await seasonDataAccess.DeleteSeason(season);
        }

    }
}
