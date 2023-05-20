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

        public async Task<ActionResult<ResponseDTO<Season>>> GetCurrentSeason()
        {
            return await seasonDataAccess.GetCurrentSeason();
        }

    }
}
