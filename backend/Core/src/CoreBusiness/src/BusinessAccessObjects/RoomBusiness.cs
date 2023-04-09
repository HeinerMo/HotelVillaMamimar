using CoreDataAccess.src.DataAccessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreBusiness.src.BusinessAccessObjects
{
    public class RoomBusiness
    {
        private readonly RoomDataAccess roomDataAccess;
        public RoomBusiness() { 
            this.roomDataAccess = new RoomDataAccess();
        }
    }
}
