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
    public class ReservationBusiness
    {

        private readonly ReservationDataAccess reservationDataAccess;
        public ReservationBusiness() { 
            this.reservationDataAccess = new ReservationDataAccess();
        }

        public async Task<ActionResult<ResponseDTO<Reservation>>> CreateReservation(Reservation reservation)
        {
            return await reservationDataAccess.CreateReservation(reservation);
        }

        public async Task<ActionResult<ResponseDTO<List<Reservation>>>> GetReservationsToList()
        {
            return await reservationDataAccess.GetReservationsToList();
        }

        public async Task<ActionResult<ResponseDTO<List<Reservation>>>> DeleteReservation(int id)
        { 
            return await reservationDataAccess.DeleteReservation(id);
        }

    }
}
