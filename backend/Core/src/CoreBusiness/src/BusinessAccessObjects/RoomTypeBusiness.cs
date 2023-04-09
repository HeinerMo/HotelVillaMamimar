using CoreDataAccess.src.DataAccessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreBusiness.src.BusinessAccessObjects
{
    public class RoomTypeBusiness
    {
        private readonly RoomTypeDataAccess roomTypeDataAccess;
        public RoomTypeBusiness() { 
            this.roomTypeDataAccess = new RoomTypeDataAccess();
        }
    }
}
