using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    [Table("tb_reservation")]
    public class Reservation
    {
        public int? Id { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? EndingDate { get; set; }
        public int? RoomId { get; set; }
        public int? CustomerId { get; set; }

        public Room? Room { get; set; }
        public Customer? Customer { get; set; }

        [NotMapped]
        public string? roomTypeName { get; set; }
    }
}
