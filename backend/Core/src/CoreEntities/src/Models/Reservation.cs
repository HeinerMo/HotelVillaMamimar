using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    public class Reservation
    {
        public int? Id { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? EndingDate { get; set; }
        public int? RoomId { get; set; }
        public int? CustomerId { get; set; }

        public Room? Room { get; set; }
        public Customer? Customer { get; set; }
    }
}
