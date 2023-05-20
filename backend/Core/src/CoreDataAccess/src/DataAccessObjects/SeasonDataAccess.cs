using CoreDataAccess.src.Context;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDataAccess.src.DataAccessObjects
{
    public class SeasonDataAccess
    {

        private readonly DataContext _context;

        public SeasonDataAccess()
        {
            _context = new DataContext();
        }

        public async Task<ActionResult<ResponseDTO<List<Season>>>> GetSeason()
        {
            var dbSeason = _context.Seasons.ToList();

            for (int i = dbSeason.Count - 1; i >= 0; i--)
            {

                DateTime startDate = (DateTime)dbSeason.ElementAt(i).StartingDate;
                DateTime endingDate = (DateTime)dbSeason.ElementAt(i).EndingDate;


                if (DateTime.Compare(DateTime.Now, startDate) <= 0 || DateTime.Compare(DateTime.Now, endingDate) >= 0)
                {
                    dbSeason.RemoveAt(i);
                }
            }
            var responseDTO = new ResponseDTO<List<Season>>();

            if (dbSeason == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer las temporadas";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbSeason;


            }

            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<Season>>> GetCurrentSeason()
        {
            var dbSeason = _context.Seasons
                 .Where(e => DateTime.Compare(DateTime.Now, (DateTime)e.StartingDate) >= 0 && DateTime.Compare(DateTime.Now, (DateTime)e.EndingDate) <= 0)
                 .FirstOrDefault();
            
            var responseDTO = new ResponseDTO<Season>();

            if (dbSeason == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer las temporadas";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbSeason;


            }

            return await Task.FromResult(responseDTO);
        }


    }
}
