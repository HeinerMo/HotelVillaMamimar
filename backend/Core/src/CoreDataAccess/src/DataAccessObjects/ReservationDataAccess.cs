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
    public class ReservationDataAccess
    {

        private readonly DataContext _context;
        public ReservationDataAccess() {
            _context = new DataContext();
        }

        public async Task<ActionResult<ResponseDTO<Reservation>>> CreateReservation(Reservation reservation)
        {
            var response = new ResponseDTO<Reservation>()
            {
                Id = 1,
                Message = "Solicitud realizada correctamente"
            };
            try
            {
                _context.Reservations.Add(reservation);
                await _context.SaveChangesAsync();
                response.Item = reservation;
            }
            catch (Exception e)
            {
                response.Id = 0;
                response.Message = e.ToString();
            }
            return await Task.FromResult(response);
        }

    }
}
