using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoreDataAccess.src.DataAccessObjects;

namespace CoreBusiness.src.BusinessAccessObjects
{
    public class HotelBusiness
    {

        private readonly HotelDataAccess hotelDataAccess;

        public HotelBusiness()
        {
            this.hotelDataAccess = new HotelDataAccess();
        }

    }
}
