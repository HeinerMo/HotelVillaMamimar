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

        public async Task<ActionResult<ResponseDTO<int>>> CreateReservation(Reservation reservation)
        {
            Reservation temp = reservation;
            temp.RoomId = reservation.Room.Id;
            temp.Room = null; //null room so it doesn't get inserted again.
            return await reservationDataAccess.CreateReservation(temp);
        }

    }
}
