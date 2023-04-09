using CoreDataAccess.src.DataAccessObjects;
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

    }
}
