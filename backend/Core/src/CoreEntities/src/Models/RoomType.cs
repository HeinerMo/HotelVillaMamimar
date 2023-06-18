using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    [Table("tb_room_type")]
    public class RoomType
    {
        public int? Id { get; set; }
        public decimal? Price { get; set; }
        public string? Name { get; set; } = String.Empty;
        public string? Description { get; set; } = String.Empty;

        public Boolean? IsDeleted { get; set; }
        [NotMapped]
        public string? HexImageString { get; set; }
        [NotMapped]
        public int? Discount { get; set; } = 0;
        [NotMapped]
        public decimal? FinalPrice { get; set; } = 0;
    
        public IEnumerable<Room>? Rooms { get; set; }
        public IEnumerable<RoomTypeImage>? RoomTypeImages { get; set; } 
        public IEnumerable<Discount>? Discounts { get; set; }
    }
}
