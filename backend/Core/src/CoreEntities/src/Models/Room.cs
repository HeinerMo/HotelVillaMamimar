using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    public class Room
    {
        public int? Id { get; set; }
        public int? roomTypeId { get; set; }
        public Boolean Active { get; set; }

        public IEnumerable<Reservation>? Reservations { get; set; }
        public RoomType? RoomType { get; set; }
    }
}
