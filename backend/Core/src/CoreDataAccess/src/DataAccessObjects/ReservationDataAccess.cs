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

        public async Task<ActionResult<ResponseDTO<int>>> CreateReservation(Reservation reservation)
        {
            var response = new ResponseDTO<int>()
            {
                Id = 1,
                Message = "Solicitud realizada correctamente"
            };
            try
            {
                _context.Reservations.Add(reservation);
                await _context.SaveChangesAsync();
                response.Item = reservation.Id ?? default(int);
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
