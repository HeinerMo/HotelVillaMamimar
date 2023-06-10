using CoreDataAccess.src.Context;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public async Task<ActionResult<ResponseDTO<List<Season>>>> GetAllSeasons()
        {

            var responseDTO = new ResponseDTO<List<Season>>();

            var dbSeasons = _context.Seasons.ToList();

            if (dbSeasons == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer las temporadas";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbSeasons;
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

        public async Task<ActionResult<ResponseDTO<Season>>> UpdateSeason(Season season)
        {
            var dbSeason = _context.Seasons.FirstOrDefault(s => s.Id == season.Id);

            var responseDTO = new ResponseDTO<Season>();
            if (dbSeason == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "Error al traer las temporadas";
                return await Task.FromResult(responseDTO);
            } 
            else
            {
                dbSeason.Id = season.Id;
                dbSeason.Porcentage = season.Porcentage;
                dbSeason.Name = season.Name;
                dbSeason.StartingDate = season.StartingDate;
                dbSeason.EndingDate = season.EndingDate;

                _context.SaveChanges();

                responseDTO.Id = 1;
                responseDTO.Message = "update success";
                responseDTO.Item = dbSeason;
                return await Task.FromResult(responseDTO);
            }


        }

        public async Task<ActionResult<ResponseDTO<List<Season>>>> CreateSeason(Season season)
        {
            var responseDTO = new ResponseDTO<List<Season>> ();

            _context.Seasons.Add(season);

            _context.SaveChanges();

            responseDTO.Id = 1;
            responseDTO.Message = "create success";
            responseDTO.Item = _context.Seasons.ToList();
            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<List<Season>>>> DeleteSeason(Season season)
        {
            var responseDTO = new ResponseDTO<List<Season>>();

            _context.Seasons.Remove(season);

            _context.SaveChanges();

            responseDTO.Id = 1;
            responseDTO.Message = "delete success";
            responseDTO.Item = _context.Seasons.ToList();
            return await Task.FromResult(responseDTO);
        }

    }
}
