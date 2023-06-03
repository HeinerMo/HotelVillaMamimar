using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    [Table("tb_room")]
    public class Room
    {
        public int? Id { get; set; }
        public int? RoomTypeId { get; set; }
        public Boolean Active { get; set; }
        [NotMapped]
        public string? ReservationStatus { get; set; } = string.Empty;
        public IEnumerable<Reservation>? Reservations { get; set; }
        public RoomType? RoomType { get; set; }
    }
}
